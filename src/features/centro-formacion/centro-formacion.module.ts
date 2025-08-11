import { Module } from '@nestjs/common';
import { CentroFormacionService } from './centro-formacion.service';
import { centroformacionController } from './centro-formacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CentroFormacion } from './entities/centro-formacion.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([CentroFormacion])
  ],
  controllers: [centroformacionController],
  providers: [CentroFormacionService],
})

export class CentroFormacionModule {}
