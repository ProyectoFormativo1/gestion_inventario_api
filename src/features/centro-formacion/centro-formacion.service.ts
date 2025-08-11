import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CentroFormacion } from './entities/centro-formacion.entity';
import { CreateCentroFormacionDto } from './dto/create-centro-formacion.dto';
import { UpdateCentroFormacionDto } from './dto/update-centro-formacion.dto';

@Injectable()
export class CentroFormacionService {
  constructor(
    @InjectRepository(CentroFormacion)
    private readonly centroFormacionRepository: Repository<CentroFormacion>,
  ) {}

  async create(createCentroFormacionDto: CreateCentroFormacionDto): Promise<CentroFormacion> {
    const centroFormacion = this.centroFormacionRepository.create(createCentroFormacionDto);
    return await this.centroFormacionRepository.save(centroFormacion);
  }

  async findAll(): Promise<CentroFormacion[]> {
    return await this.centroFormacionRepository.find();
  }

  async findOne(id: number): Promise<CentroFormacion> {
    const centroFormacion = await this.centroFormacionRepository.findOne({ where: { id } });
    if (!centroFormacion) {
      throw new NotFoundException(`CentroFormacion #${id} not found`);
    }
    return centroFormacion;
  }

  async update(id: number, updateCentroFormacionDto: UpdateCentroFormacionDto): Promise<CentroFormacion> {
    const centroFormacion = await this.centroFormacionRepository.preload({
      id,
      ...updateCentroFormacionDto,
    });
    if (!centroFormacion) {
      throw new NotFoundException(`CentroFormacion #${id} not found`);
    }
    return await this.centroFormacionRepository.save(centroFormacion);
  }

  async remove(id: number): Promise<void> {
    const result = await this.centroFormacionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`CentroFormacion #${id} not found`);
    }
  }
}
