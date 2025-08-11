import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolPermisosService } from './rol-permisos.service';
import { CreateRolPermisoDto } from './dto/create-rol-permiso.dto';
import { UpdateRolPermisoDto } from './dto/update-rol-permiso.dto';

@Controller('rol-permisos')
export class RolPermisosController {
  constructor(private readonly rolPermisosService: RolPermisosService) {}

  @Post()
  create(@Body() createRolPermisoDto: CreateRolPermisoDto) {
    return this.rolPermisosService.create(createRolPermisoDto);
  }

  @Get()
  findAll() {
    return this.rolPermisosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolPermisosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRolPermisoDto: UpdateRolPermisoDto) {
    return this.rolPermisosService.update(+id, updateRolPermisoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolPermisosService.remove(+id);
  }
}
