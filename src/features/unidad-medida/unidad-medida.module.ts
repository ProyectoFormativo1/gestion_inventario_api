import { Module } from '@nestjs/common';
import { UnidadMedidaService } from './unidad-medida.service';
import { UnidadMedidaController } from './unidad-medida.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadMedida } from './entities/unidad-medida.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UnidadMedida])
  ],
  controllers: [UnidadMedidaController],
  providers: [UnidadMedidaService],
})
export class UnidadMedidaModule {}
