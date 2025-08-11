import { Module } from '@nestjs/common';
import { ProgramaService } from './programas.service';
import { ProgramasController } from './programas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Programa } from './entities/programa.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Programa])
  ],
  controllers: [ProgramasController],
  providers: [ProgramaService],
})
export class ProgramasModule {}
