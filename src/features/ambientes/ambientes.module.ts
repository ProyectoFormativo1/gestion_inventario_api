import { Module } from '@nestjs/common';
import { AmbientesService } from './ambientes.service';
import { AmbientesController } from './ambientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ambiente } from './entities/ambiente.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ambiente])
  ],
  controllers: [AmbientesController],
  providers: [AmbientesService],
})
export class AmbientesModule {}
