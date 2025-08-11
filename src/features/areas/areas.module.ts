import { Module } from '@nestjs/common';
import { AreaService } from './areas.service';
import { AreasController } from './areas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from './entities/area.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Area])
  ],
  controllers: [AreasController],
  providers: [AreaService],
})
export class AreasModule {}
