import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Locacion } from './entities/locacion.entity';
import { CreateLocacionDto } from './dto/create-locacion.dto';
import { UpdateLocacionDto } from './dto/update-locacion.dto';

@Injectable()
export class LocacionService {
  constructor(
    @InjectRepository(Locacion)
    private readonly locacionRepository: Repository<Locacion>,
  ) {}

  async create(createLocacionDto: CreateLocacionDto): Promise<Locacion> {
    const locacion = this.locacionRepository.create(createLocacionDto);
    return await this.locacionRepository.save(locacion);
  }

  async findAll(): Promise<Locacion[]> {
    return await this.locacionRepository.find();
  }

  async findOne(id: number): Promise<Locacion> {
    const locacion = await this.locacionRepository.findOne({ where: { id } });
    if (!locacion) {
      throw new NotFoundException(`Locacion #${id} not found`);
    }
    return locacion;
  }

  async update(id: number, updateLocacionDto: UpdateLocacionDto): Promise<Locacion> {
    const locacion = await this.locacionRepository.preload({
      id,
      ...updateLocacionDto,
    });
    if (!locacion) {
      throw new NotFoundException(`Locacion #${id} not found`);
    }
    return await this.locacionRepository.save(locacion);
  }

  async remove(id: number): Promise<void> {
    const result = await this.locacionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Locacion #${id} not found`);
    }
  }
}
