import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permiso } from './entities/permiso.entity';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';

@Injectable()
export class PermisosService {
  constructor(
    @InjectRepository(Permiso)
    private readonly permisoRepository: Repository<Permiso>,
  ) {}

  async create(createPermisoDto: CreatePermisoDto): Promise<Permiso> {
    const permiso = this.permisoRepository.create(createPermisoDto);
    return await this.permisoRepository.save(permiso);
  }

  async findAll(): Promise<Permiso[]> {
    return await this.permisoRepository.find();
  }

  async findOne(id: number): Promise<Permiso> {
    const permiso = await this.permisoRepository.findOne({ where: { id } });
    if (!permiso) {
      throw new NotFoundException(`Permiso #${id} not found`);
    }
    return permiso;
  }

  async update(id: number, updatePermisoDto: UpdatePermisoDto): Promise<Permiso> {
    const permiso = await this.permisoRepository.preload({
      id,
      ...updatePermisoDto,
    });
    if (!permiso) {
      throw new NotFoundException(`Permiso #${id} not found`);
    }
    return await this.permisoRepository.save(permiso);
  }

  async remove(id: number): Promise<void> {
    const result = await this.permisoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Permiso #${id} not found`);
    }
  }
}
