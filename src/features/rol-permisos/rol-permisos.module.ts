import { Module } from '@nestjs/common';
import { RolPermisosService } from './rol-permisos.service';
import { RolPermisosController } from './rol-permisos.controller';

@Module({
  controllers: [RolPermisosController],
  providers: [RolPermisosService],
})
export class RolPermisosModule {}
