import { Injectable } from '@nestjs/common';
import { MovimientoReporteService } from '../movimientos/movimiento-reporte.service';
import { MaterialesReporteService } from '../materiales/materiales-reporte.service';

@Injectable()
export class EstadisticaService {

  constructor(
    private readonly movimientoReporteService: MovimientoReporteService,
    private readonly materialesReporteService: MaterialesReporteService,
  ) {}

  async findAll() {
    const materiales = await this.materialesReporteService.getMaterialStats();
    const proximosAVencer = await this.materialesReporteService.findProximosAVencer();
    const reabastecimientos = await this.materialesReporteService.countReabastecimiento();
    const movimientosHoy = await this.movimientoReporteService.findTodayMovimientos();
    const movimientosAnioActual = await this.movimientoReporteService.countByMonth();
    return {
      materiales: materiales,
      proximosAVencer: proximosAVencer,
      reabastecimientos: reabastecimientos,
      movimientosHoy: movimientosHoy,
      movimientosAnioActual: movimientosAnioActual,
    };
  }

}
