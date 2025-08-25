import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movimiento } from './entities/movimiento.entity';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';
import { MovimientoDto } from './dto/movimiento.dto';
import { MaterialesService } from '../materiales/materiales.service';
import { TipoMovimientoService } from '../tipo-movimiento/tipo-movimiento.service';
import { TipoMovimientoEnum } from '../tipo-movimiento/entities/tipo-movimeinto.enum';

@Injectable()
export class MovimientosService {
  constructor(
    @InjectRepository(Movimiento)
    private readonly movimientoRepository: Repository<Movimiento>,
    private readonly materialesService: MaterialesService,
    private readonly tipoMovimientoService: TipoMovimientoService,
  ) {}

  async create(createMovimientoDto: CreateMovimientoDto): Promise<Movimiento> {

    const findMaterial = await this.materialesService.findOne(createMovimientoDto.materialId);
    if (!findMaterial) {
      throw new NotFoundException(`Material #${createMovimientoDto.materialId} no encontrado`);
    }

    //Logica para verificar el tipo de movimiento y el stock
    const findTipoMovimiento = await this.tipoMovimientoService.findOneById(createMovimientoDto.tipoMovimientoId);
    if (findTipoMovimiento?.tipo === TipoMovimientoEnum.SALIDA) { // salida
      if (findMaterial.stok < createMovimientoDto.cantidad) {
        throw new NotFoundException(`No hay suficiente stock del material ${findMaterial.nombre}. Stock actual: ${findMaterial.stok}`);
      }
      findMaterial.stok -= createMovimientoDto.cantidad;
    }
    else if (findTipoMovimiento?.tipo === TipoMovimientoEnum.ENTRADA) { // entrada
      findMaterial.stok += createMovimientoDto.cantidad;
    }
    this.materialesService.update(findMaterial.id, { stok: findMaterial.stok });
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
}
