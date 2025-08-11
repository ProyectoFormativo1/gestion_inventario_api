import { Module } from '@nestjs/common';
import { BodegaService } from './bodega.service';
import { BodegasController } from './bodega.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bodega } from './entities/bodega.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bodega]),
  ],
  controllers: [BodegasController],
  providers: [BodegaService],
})
export class BodegasModule {}
