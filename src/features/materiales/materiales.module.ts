import { Module } from '@nestjs/common';
import { MaterialesService } from './materiales.service';
import { MaterialesController } from './materiales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from './entities/materiale.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Material]),
  ],
  controllers: [MaterialesController],
  providers: [MaterialesService],
  exports: [MaterialesService]
})
export class MaterialesModule {}
