import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RolPermisosService } from './rol-permisos.service';
import { CreateRolPermisoDto } from './dto/create-rol-permiso.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('rol-permisos')
export class RolPermisosController {
  constructor(private readonly rolPermisosService: RolPermisosService) {}

  @Post()
  create(@Body() createRolPermisoDto: CreateRolPermisoDto) {
    return this.rolPermisosService.create(createRolPermisoDto);
  }

  @Get('rol/:rolId')
  @ApiOperation({ summary: 'Obtener permisos del rol' })
  findAllByRol(@Param('rolId') rolId: number) {
    return this.rolPermisosService.findAllByRol(rolId);
  }

   @Delete(':rolId/:permisoId')
    remove( @Param('rolId') rolId: number, @Param('permisoId') permisoId: number) {
      return this.rolPermisosService.remove(rolId, permisoId);
    }
}
