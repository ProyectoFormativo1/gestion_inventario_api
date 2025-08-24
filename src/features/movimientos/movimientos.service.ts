import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movimiento } from './entities/movimiento.entity';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';
import { MovimientoDto } from './dto/movimiento.dto';

@Injectable()
export class MovimientosService {
  constructor(
    @InjectRepository(Movimiento)
    private readonly movimientoRepository: Repository<Movimiento>,
  ) {}

  async create(createMovimientoDto: CreateMovimientoDto): Promise<Movimiento> {
    const movimiento = this.movimientoRepository.create({
      ...createMovimientoDto,
    });
    return await this.movimientoRepository.save(movimiento);
  }

  async findAll(): Promise<MovimientoDto[]> {
    const movimientos = await this.movimientoRepository.find({
      relations: ['material', 'responsable', 'tipoMovimiento'],
      order: {
        fecha: 'DESC', // del más reciente al más antiguo
      },
    });

    return movimientos.map((movimiento) => ({
      id: movimiento.id,
      cantidad: movimiento.cantidad,
      observaciones: movimiento.observaciones,
      materialId: movimiento.materialId,
      responsableId: movimiento.responsableId,
      tipoMovimientoId: movimiento.tipoMovimientoId,
      materialNombre: movimiento.material.nombre,
      responsableNombre: `${movimiento.responsable.nombres} ${movimiento.responsable.apellidos}`,
      tipoMovimientoDescripcion: movimiento.tipoMovimiento.descripcion,
      tipoMovimientoNombre: movimiento.tipoMovimiento.tipo,
      tipoMovimientoCodigo: movimiento.tipoMovimiento.codigo,
      fecha: movimiento.fecha.toISOString(),
    }));
  }
  async findOne(id: number): Promise<Movimiento> {
    const movimiento = await this.movimientoRepository.findOne({
      where: { id },
    });
    if (!movimiento) {
      throw new NotFoundException(`Movimiento #${id} no encontrado`);
    }
    return movimiento;
  }

  async update(
    id: number,
    updateMovimientoDto: UpdateMovimientoDto,
  ): Promise<Movimiento> {
    const movimiento = await this.movimientoRepository.preload({
      id,
      ...updateMovimientoDto,
    });
    if (!movimiento) {
      throw new NotFoundException(`Movimiento #${id} no encontrado`);
    }
    return await this.movimientoRepository.save(movimiento);
  }

  async remove(id: number): Promise<void> {
    const result = await this.movimientoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Movimiento #${id} no encontrado`);
    }
  }

  async countByMonth(): Promise<
    { mes: string; nombreMes: string; numeroMes: number; entradas: number; salidas: number }[]
  > {
    const currentYear = new Date().getFullYear();
    // Meses en español
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    // Consulta movimientos agrupados por mes
    const movimientos = await this.movimientoRepository
      .createQueryBuilder('movimiento')
      .leftJoin('movimiento.tipoMovimiento', 'tipoMovimiento')
      .select([
        "EXTRACT(MONTH FROM movimiento.fecha) AS mes_num",
        "SUM(CASE WHEN tipoMovimiento.tipo = 'entrada' THEN 1 ELSE 0 END) AS entradas",
        "SUM(CASE WHEN tipoMovimiento.tipo = 'salida' THEN 1 ELSE 0 END) AS salidas",
      ])
      .where("EXTRACT(YEAR FROM movimiento.fecha) = :year", { year: currentYear })
      .groupBy("mes_num")
      .orderBy("mes_num", "ASC")
      .getRawMany();

    // Crear resultado para todos los meses
    const resultado = meses.map((nombreMes, idx) => {
      const mes_num = idx + 1;
      const mov = movimientos.find(m => Number(m.mes_num) === mes_num);
      return {
        mes: `${currentYear}-${mes_num.toString().padStart(2, '0')}`,
        nombreMes,
        numeroMes: mes_num,
        entradas: mov ? Number(mov.entradas) : 0,
        salidas: mov ? Number(mov.salidas) : 0,
      };
    });

    return resultado;
  }

  async findTodayMovimientos(): Promise<{total: number; entradas: number; salidas: number }> {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

    const result = await this.movimientoRepository
      .createQueryBuilder('movimiento')
      .leftJoin('movimiento.tipoMovimiento', 'tipoMovimiento')
      .select([
        "SUM(CASE WHEN tipoMovimiento.tipo = 'entrada' THEN movimiento.cantidad ELSE 0 END) AS entradas",
        "SUM(CASE WHEN tipoMovimiento.tipo = 'salida' THEN movimiento.cantidad ELSE 0 END) AS salidas",
      ])
      .where('movimiento.fecha BETWEEN :start AND :end', { start: startOfDay, end: endOfDay })
      .getRawOne();

    return {
      total: (Number(result.entradas) || 0) + (Number(result.salidas) || 0),
      entradas: Number(result.entradas) || 0,
      salidas: Number(result.salidas) || 0,
    };
  }
}
