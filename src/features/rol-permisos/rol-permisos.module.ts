import { Module } from '@nestjs/common';
import { RolPermisosService } from './rol-permisos.service';
import { RolPermisosController } from './rol-permisos.controller';
import { PermisosModule } from '../permisos/permisos.module';
import { RolesModule } from '../roles/roles.module';
import { RolPermiso } from './entities/rol-permiso.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([RolPermiso]),
    PermisosModule,
    RolesModule,
  ],
  controllers: [RolPermisosController],
  providers: [RolPermisosService],
})
export class RolPermisosModule {}
