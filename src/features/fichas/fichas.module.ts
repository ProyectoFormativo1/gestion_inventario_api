import { Module } from '@nestjs/common';
import { FichaService } from './fichas.service';
import { FichasController } from './fichas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ficha } from './entities/ficha.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ficha])
  ],
  controllers: [FichasController],
  providers: [FichaService],
})
export class FichasModule {}
