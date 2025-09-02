import { Module } from '@nestjs/common';
import { PerritoService } from './perrito.service';
import { PerritoController } from './perrito.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perrito } from './entities/perrito.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Perrito])
  ],
  controllers: [PerritoController],
  providers: [PerritoService],
})
export class PerritoModule {}
