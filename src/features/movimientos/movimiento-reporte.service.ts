import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movimiento } from './entities/movimiento.entity';
import { MaterialesService } from '../materiales/materiales.service';
import { TipoMovimientoService } from '../tipo-movimiento/tipo-movimiento.service';

@Injectable()
export class MovimientoReporteService {
  constructor(
    @InjectRepository(Movimiento)
    private readonly movimientoRepository: Repository<Movimiento>,
    private readonly materialesService: MaterialesService,
    private readonly tipoMovimientoService: TipoMovimientoService,
  ) {}


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

  async findTodayMovimientos(): Promise<{ total: number; entradas: number; salidas: number }> {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

    const result = await this.movimientoRepository
      .createQueryBuilder('movimiento')
      .leftJoin('movimiento.tipoMovimiento', 'tipoMovimiento')
      .select([
        "COUNT(CASE WHEN tipoMovimiento.tipo = 'entrada' THEN 1 END) AS entradas",
        "COUNT(CASE WHEN tipoMovimiento.tipo = 'salida' THEN 1 END) AS salidas",
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
