import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Programa } from './entities/programa.entity';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';

@Injectable()
export class ProgramaService {
  constructor(
    @InjectRepository(Programa)
    private readonly programaRepository: Repository<Programa>,
  ) {}

  async create(createProgramaDto: CreateProgramaDto): Promise<Programa> {
    const programa = this.programaRepository.create(createProgramaDto);
    return await this.programaRepository.save(programa);
  }

  async findAll(): Promise<Programa[]> {
    return await this.programaRepository.find();
  }

  async findOne(id: number): Promise<Programa> {
    const programa = await this.programaRepository.findOne({ where: { id } });
    if (!programa) {
      throw new NotFoundException(`Programa #${id} not found`);
    }
    return programa;
  }

  async update(id: number, updateProgramaDto: UpdateProgramaDto): Promise<Programa> {
    const programa = await this.programaRepository.preload({
      id,
      ...updateProgramaDto,
    });
    if (!programa) {
      throw new NotFoundException(`Programa #${id} not found`);
    }
    return await this.programaRepository.save(programa);
  }

  async remove(id: number): Promise<void> {
    const result = await this.programaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Programa #${id} not found`);
    }
  }
}
