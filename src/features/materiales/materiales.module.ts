import { Module } from '@nestjs/common';
import { MaterialesService } from './materiales.service';
import { MaterialesController } from './materiales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from './entities/materiale.entity';
import { MaterialesReporteService } from './materiales-reporte.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Material]),
  ],
  controllers: [MaterialesController],
  providers: [MaterialesService, MaterialesReporteService],
  exports: [MaterialesService, MaterialesReporteService]
})
export class MaterialesModule {}
