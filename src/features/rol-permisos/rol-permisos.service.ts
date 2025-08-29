import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRolPermisoDto } from './dto/create-rol-permiso.dto';
import { UpdateRolPermisoDto } from './dto/update-rol-permiso.dto';
import { PermisoDto, RolPermisoDto } from './dto/rol-permiso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RolPermiso } from './entities/rol-permiso.entity';
import { Repository } from 'typeorm';
import { PermisosService } from '../permisos/permisos.service';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class RolPermisosService {
  constructor(
    @InjectRepository(RolPermiso)
    private readonly rolPermisosRepository: Repository<RolPermiso>,
    private readonly permisoService: PermisosService,
    private readonly rolesService: RolesService,
  ) {}

  async create(createRolPermisoDto: CreateRolPermisoDto): Promise<RolPermiso> {
     const rolPermiso = this.rolPermisosRepository.create({
      ...createRolPermisoDto,
    });
    return await this.rolPermisosRepository.save(rolPermiso);
  }

  async findAllByRol(rolId: number): Promise<RolPermisoDto[]> {
    const permisos = await this.permisoService.findAll(); // todos los permisos
    const findRole = await this.rolesService.findOne(rolId);
    if (!findRole) {
      throw new Error(`Rol con ID ${rolId} no encontrado`);
    }
    const permisosAsignados = await this.rolPermisosRepository.find({
      where: { rolId },
    });

    const asignadosIds = new Set(permisosAsignados.map((p) => p.permisoId));
    // Agrupar por módulo
    const grouped: Record<string, PermisoDto[]> = {};
    for (const permiso of permisos) {
      const dto: PermisoDto = {
        id: permiso.id,
        nombre: permiso.nombre,
        descripcion: permiso.descripcion,
        modulo: permiso.modulo,
        asignado: asignadosIds.has(permiso.id),
      };
      if (!grouped[permiso.modulo]) {
        grouped[permiso.modulo] = [];
      }
      grouped[permiso.modulo].push(dto);
    }
    return Object.entries(grouped).map(([modulo, permisos]) => ({
      rolId: findRole.id,
      rolNombre: findRole.nombre,
      modulo,
      permisos,
    }));
  }

  async remove(rolId: number, permisoId: number): Promise<void> {
      const result = await this.rolPermisosRepository.delete({ rolId, permisoId });
      if (result.affected === 0) {
        throw new NotFoundException(`RolPermiso #${rolId} ${permisoId} no encontrado`);
      }
    }
}
