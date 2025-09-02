import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Perrito } from './entities/perrito.entity';
import { CreatePerritoDto } from './dto/create-perrito.dto';
import { UpdatePerritoDto } from './dto/update-perrito.dto';

@Injectable()
export class PerritoService {
  constructor(
    @InjectRepository(Perrito)
    private readonly perritoRepository: Repository<Perrito>,
  ) {}

  async create(createPerritoDto: CreatePerritoDto): Promise<Perrito> {
    const perrito = this.perritoRepository.create(createPerritoDto);
    return await this.perritoRepository.save(perrito);
  }

  async findAll(): Promise<Perrito[]> {
    return await this.perritoRepository.find();
  }

  async findOne(id: number): Promise<Perrito> {
    const perrito = await this.perritoRepository.findOne({ where: { id } });
    if (!perrito) {
      throw new NotFoundException(`Perrito #${id} no encontrado`);
    }
    return perrito;
  }

  async update(id: number, updatePerritoDto: UpdatePerritoDto): Promise<Perrito> {
    const perrito = await this.perritoRepository.preload({
      id,
      ...updatePerritoDto,
    });
    if (!perrito) {
      throw new NotFoundException(`Perrito #${id} no encontrado`);
    }
    return await this.perritoRepository.save(perrito);
  }

  async remove(id: number): Promise<void> {
    const result = await this.perritoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Perrito #${id} no encontrado`);
    }
  }
}
