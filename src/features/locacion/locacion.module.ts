import { Module } from '@nestjs/common';
import { LocacionService } from './locacion.service';
import { LocacionController } from './locacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locacion } from './entities/locacion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Locacion])
  ],
  controllers: [LocacionController],
  providers: [LocacionService],
})
export class LocacionModule {}
