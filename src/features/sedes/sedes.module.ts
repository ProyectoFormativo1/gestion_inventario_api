import { Module } from '@nestjs/common';
import { SedeService } from './sedes.service';
import { SedesController } from './sedes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  Sede} from './entities/sede.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Sede])
  ],
  controllers: [SedesController],
  providers: [SedeService],
})

export class SedesModule {}
