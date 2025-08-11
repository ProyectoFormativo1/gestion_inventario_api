import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ambiente } from './entities/ambiente.entity';
import { CreateAmbienteDto } from './dto/create-ambiente.dto';
import { UpdateAmbienteDto } from './dto/update-ambiente.dto';

@Injectable()
export class AmbientesService {
  constructor(
    @InjectRepository(Ambiente)
    private readonly ambienteRepository: Repository<Ambiente>,
  ) {}

  async create(createAmbienteDto: CreateAmbienteDto): Promise<Ambiente> {
    const ambiente = this.ambienteRepository.create(createAmbienteDto);
    return await this.ambienteRepository.save(ambiente);
  }

  async findAll(): Promise<Ambiente[]> {
    return await this.ambienteRepository.find();
  }

  async findOne(id: number): Promise<Ambiente> {
    const ambiente = await this.ambienteRepository.findOne({ where: { id } });
    if (!ambiente) {
      throw new NotFoundException(`Ambiente #${id} not found`);
    }
    return ambiente;
  }

  async update(id: number, updateAmbienteDto: UpdateAmbienteDto): Promise<Ambiente> {
    const ambiente = await this.ambienteRepository.preload({
      id,
      ...updateAmbienteDto,
    });
    if (!ambiente) {
      throw new NotFoundException(`Ambiente #${id} not found`);
    }
    return await this.ambienteRepository.save(ambiente);
  }

  async remove(id: number): Promise<void> {
    const result = await this.ambienteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Ambiente #${id} not found`);
    }
  }
}
