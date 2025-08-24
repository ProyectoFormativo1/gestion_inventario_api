import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ambiente } from './entities/ambiente.entity';
import { CreateAmbienteDto } from './dto/create-ambiente.dto';
import { UpdateAmbienteDto } from './dto/update-ambiente.dto';
import { AmbienteDto } from './dto/ambientes.dto';

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

  async findAll(): Promise<AmbienteDto[]> {
    const result = await this.ambienteRepository.find({
      relations: [
        'area', 'area.sede', 'area.sede.centroFormacion', 'area.sede.centroFormacion.locacion'
      ],
    });
    return result.map((ambiente) => {
      return {
        id: ambiente.id,
        nombre: ambiente.nombre,
        areaId: ambiente.area.id,
        areaNombre: ambiente.area?.nombre || '',
        sedeId: ambiente.area.sede.id,
        sedeNombre: ambiente.area.sede?.nombre || '',
        centroFormacionId: ambiente.area.sede.centroFormacion.id,
        centroFormacionNombre: ambiente.area.sede.centroFormacion?.nombre || '',
        locacionId: ambiente.area.sede.centroFormacion.locacion.id,
        locacionNombre: ambiente.area.sede.centroFormacion.locacion?.nombre || '',
      };
    });
  }

  async findAllByAreas(areaId: number): Promise<AmbienteDto[]> {
    const result = await this.ambienteRepository.find({
      where: { areaId },
      relations: [
        'area',
        'area.sede',
        'area.sede.centroFormacion',
        'area.sede.centroFormacion.locacion',
      ],
    });
    return result.map((ambiente) => {
      return {
        id: ambiente.id,
        nombre: ambiente.nombre,
        areaId: ambiente.area.id,
        areaNombre: ambiente.area?.nombre || '',
        sedeId: ambiente.area.sede.id,
        sedeNombre: ambiente.area.sede?.nombre || '',
        centroFormacionId: ambiente.area.sede.centroFormacion.id,
        centroFormacionNombre: ambiente.area.sede.centroFormacion?.nombre || '',
        locacionId: ambiente.area.sede.centroFormacion.locacion.id,
        locacionNombre: ambiente.area.sede.centroFormacion.locacion?.nombre || '',
      };
    });
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
