import { Module } from '@nestjs/common';
import { LocacionService } from './locacion.service';
import { LocacionController } from './locacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locacion } from './entities/locacion.entity';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Locacion]),
    AuthModule
  ],
  controllers: [LocacionController],
  providers: [LocacionService],
})
export class LocacionModule {}
