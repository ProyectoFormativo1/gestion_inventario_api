import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnidadMedida } from './entities/unidad-medida.entity';
import { CreateUnidadMedidaDto } from './dto/create-unidad-medida.dto';
import { UpdateUnidadMedidaDto } from './dto/update-unidad-medida.dto';

@Injectable()
export class UnidadMedidaService {
  constructor(
    @InjectRepository(UnidadMedida)
    private readonly unidadMedidaRepository: Repository<UnidadMedida>,
  ) {}

  async create(createUnidadMedidaDto: CreateUnidadMedidaDto): Promise<UnidadMedida> {
    const unidad = this.unidadMedidaRepository.create({
      ...createUnidadMedidaDto
    });
    return await this.unidadMedidaRepository.save(unidad);
  }

  async findAll(): Promise<UnidadMedida[]> {
    return await this.unidadMedidaRepository.find();
  }

  async findOne(id: number): Promise<UnidadMedida> {
    const unidad = await this.unidadMedidaRepository.findOne({ where: { id } });
    if (!unidad) {
      throw new NotFoundException(`Unidad de medida #${id} no encontrada`);
    }
    return unidad;
  }

  async update(id: number, updateUnidadMedidaDto: UpdateUnidadMedidaDto): Promise<UnidadMedida> {
    const unidad = await this.unidadMedidaRepository.preload({
      id,
      ...updateUnidadMedidaDto,
    });
    if (!unidad) {
      throw new NotFoundException(`Unidad de medida #${id} no encontrada`);
    }
    return await this.unidadMedidaRepository.save(unidad);
  }

  async remove(id: number): Promise<void> {
    const result = await this.unidadMedidaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Unidad de medida #${id} no encontrada`);
    }
  }
}
