import { Module } from '@nestjs/common';
import { EstadisticaService } from './estadistica.service';
import { EstadisticaController } from './estadistica.controller';
import { MovimientosModule } from '../movimientos/movimientos.module';
import { MaterialesModule } from '../materiales/materiales.module';

@Module({
  imports: [
    MovimientosModule,
    MaterialesModule
  ],
  controllers: [EstadisticaController],
  providers: [EstadisticaService],
})
export class EstadisticaModule {}
