import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException(`Role #${id} not found`);
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.roleRepository.preload({
      id,
      ...updateRoleDto,
    });
    if (!role) {
      throw new NotFoundException(`Role #${id} not found`);
    }
    return await this.roleRepository.save(role);
  }

  async remove(id: number): Promise<void> {
    const result = await this.roleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Role #${id} not found`);
    }
  }
}
