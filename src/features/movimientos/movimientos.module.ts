import { Module } from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
import { MovimientosController } from './movimientos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimiento } from './entities/movimiento.entity';
import { MaterialesModule } from '../materiales/materiales.module';
import { TipoMovimientoModule } from '../tipo-movimiento/tipo-movimiento.module';
import { MovimientoReporteService } from './movimiento-reporte.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movimiento]),
    MaterialesModule,
    TipoMovimientoModule
  ],
  controllers: [MovimientosController],
  providers: [MovimientosService, MovimientoReporteService],
  exports: [MovimientosService, MovimientoReporteService]
})
export class MovimientosModule {}
