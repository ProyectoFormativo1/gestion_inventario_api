import { Injectable } from '@nestjs/common';
import { MovimientosService } from '../movimientos/movimientos.service';
import { MaterialesService } from '../materiales/materiales.service';

@Injectable()
export class EstadisticaService {

  constructor(
    private readonly movimientosService: MovimientosService,
    private readonly materialesService: MaterialesService,
  ) {}

  async findAll() {
    const materiales = await this.materialesService.getMaterialStats();
    const proximosAVencer = await this.materialesService.findProximosAVencer();
    const reabastecimientos = await this.materialesService.countReabastecimiento();
    const movimientosHoy = await this.movimientosService.findTodayMovimientos();

    const movimientos = await this.movimientosService.countByMonth();
    return {
      materiales: materiales,
      proximosAVencer: proximosAVencer,
      reabastecimientos: reabastecimientos,
      movimientosHoy: movimientosHoy,
      movimientos: movimientos,
    };
  }

}
