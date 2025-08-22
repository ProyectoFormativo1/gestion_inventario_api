import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bodega } from './entities/bodega.entity';
import { CreateBodegaDto } from './dto/create-bodega.dto';
import { UpdateBodegaDto } from './dto/update-bodega.dto';
import { BodegaDto } from './dto/bodega.dto';

@Injectable()
export class BodegaService {
  constructor(
    @InjectRepository(Bodega)
    private readonly bodegaRepository: Repository<Bodega>,
  ) {}

  async create(createBodegaDto: CreateBodegaDto): Promise<Bodega> {
    const bodega = this.bodegaRepository.create(createBodegaDto);
    return await this.bodegaRepository.save(bodega);
  }

  async findAll(): Promise<BodegaDto[]> {
    const result = await this.bodegaRepository.find({
      relations: ['area', 'area.sede', 'area.sede.centroFormacion', 'area.sede.centroFormacion.locacion'],
    });
    return result.map((bodega) => {
      return {
        id: bodega.id,
        nombre: bodega.nombre,
        areaId: bodega.areaId,
        areaNombre: bodega.area?.nombre || '',
        sedeId: bodega.area.sedeId,
        sedeNombre: bodega.area.sede?.nombre || '',
        centroFormacionId: bodega.area.sede.centroFormacion.id,
        centroFormacionNombre: bodega.area.sede.centroFormacion?.nombre || '',
        locacionId: bodega.area.sede.centroFormacion.locacion.id,
        locacionNombre: bodega.area.sede.centroFormacion.locacion?.nombre || '',
      };
    });
  }

  async findAllByAreas(areaId: number): Promise<BodegaDto[]> {
    const result = await this.bodegaRepository.find({
      where: { areaId },
      relations: [
        'area',
        'area.sede',
        'area.sede.centroFormacion',
        'area.sede.centroFormacion.locacion',
      ],
    });
    return result.map((bodega) => {
      return {
        id: bodega.id,
        nombre: bodega.nombre,
        areaId: bodega.area.id,
        areaNombre: bodega.area?.nombre || '',
        sedeId: bodega.area.sede.id,
        sedeNombre: bodega.area.sede?.nombre || '',
        centroFormacionId: bodega.area.sede.centroFormacion.id,
        centroFormacionNombre: bodega.area.sede.centroFormacion?.nombre || '',
        locacionId: bodega.area.sede.centroFormacion.locacion.id,
        locacionNombre: bodega.area.sede.centroFormacion.locacion?.nombre || '',
      };
    });
  }

  async findOne(id: number): Promise<Bodega> {
    const bodega = await this.bodegaRepository.findOne({ where: { id } });
    if (!bodega) {
      throw new NotFoundException(`Bodega #${id} not found`);
    }
    return bodega;
  }

  async update(id: number, updateBodegaDto: UpdateBodegaDto): Promise<Bodega> {
    const bodega = await this.bodegaRepository.preload({
      id,
      ...updateBodegaDto,
    });
    if (!bodega) {
      throw new NotFoundException(`Bodega #${id} not found`);
    }
    return await this.bodegaRepository.save(bodega);
  }

  async remove(id: number): Promise<void> {
    const result = await this.bodegaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Bodega #${id} not found`);
    }
  }
}
