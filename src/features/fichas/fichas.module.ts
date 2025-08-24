import { Module } from '@nestjs/common';
import { FichaService } from './fichas.service';
import { FichasController } from './fichas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ficha } from './entities/ficha.entity';
import { AmbientesModule } from '../ambientes/ambientes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ficha]), AmbientesModule
  ],
  controllers: [FichasController],
  providers: [FichaService],
})
export class FichasModule {}
