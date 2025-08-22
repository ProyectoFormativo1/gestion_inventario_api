import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sede } from './entities/sede.entity';
import { CreateSedeDto } from './dto/create-sede.dto';
import { UpdateSedeDto } from './dto/update-sede.dto';
import { SedeDto } from './dto/sede.dto';

@Injectable()
export class SedeService {
  constructor(
    @InjectRepository(Sede)
    private readonly sedeRepository: Repository<Sede>,
  ) {}

  async create(createSedeDto: CreateSedeDto): Promise<Sede> {
    const sede = this.sedeRepository.create(createSedeDto);
    return await this.sedeRepository.save(sede);
  }

  async findAll(): Promise<SedeDto[]> {
    const result = await this.sedeRepository.find({
      relations: ['centroFormacion', 'centroFormacion.locacion'],
    });
    return result.map((sede) => {
      return {
        id: sede.id,
        nombre: sede.nombre,
        centroFormacionId: sede.centroFormacion.id,
        centroFormacionNombre: sede.centroFormacion?.nombre || '',
        locacionId: sede.centroFormacion.locacion.id,
        locacionNombre: sede.centroFormacion.locacion?.nombre || '',
      };
    });
  }


  async findAllByCentroFormacion(centroFormacionId: number): Promise<SedeDto[]> {
      const result = await this.sedeRepository.find({
        where: { centroFormacionId },
        relations: ['centroFormacion', 'centroFormacion.locacion'],
      });
      return result.map((sede) => {
        return {
          id: sede.id,
          nombre: sede.nombre,
          centroFormacionId: sede.centroFormacion.id,
          centroFormacionNombre: sede.centroFormacion?.nombre || '',
          locacionId: sede.centroFormacion.locacion.id,
          locacionNombre: sede.centroFormacion.locacion?.nombre || '',
        };
      });
    }

  async findOne(id: number): Promise<Sede> {
    const sede = await this.sedeRepository.findOne({ where: { id } });
    if (!sede) {
      throw new NotFoundException(`Sede #${id} not found`);
    }
    return sede;
  }

  async update(id: number, updateSedeDto: UpdateSedeDto): Promise<Sede> {
    const sede = await this.sedeRepository.preload({
      id,
      ...updateSedeDto,
    });
    if (!sede) {
      throw new NotFoundException(`Sede #${id} not found`);
    }
    return await this.sedeRepository.save(sede);
  }

  async remove(id: number): Promise<void> {
    const result = await this.sedeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Sede #${id} not found`);
    }
  }
}
