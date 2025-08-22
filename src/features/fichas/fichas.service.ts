import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ficha } from './entities/ficha.entity';
import { CreateFichaDto } from './dto/create-ficha.dto';
import { UpdateFichaDto } from './dto/update-ficha.dto';
import { FichaDto } from './dto/ficha.dto';

@Injectable()
export class FichaService {
  constructor(
    @InjectRepository(Ficha)
    private readonly fichaRepository: Repository<Ficha>,
  ) {}

 async create(createFichaDto: CreateFichaDto): Promise<Ficha> {
  const ficha = this.fichaRepository.create({
    ...createFichaDto
  });
  return await this.fichaRepository.save(ficha);
}

  async findAll(): Promise<FichaDto[]> {
     const result = await this.fichaRepository.find({
       relations: [
         'programa', 'area', 'area.sede', 'area.sede.centroFormacion', 'area.sede.centroFormacion.locacion'
       ],
    });
    return result.map((ficha) => {
      return {
        id: ficha.id,
        codigo: ficha.codigo,
        programaId: ficha.programaId,
        programaNombre: ficha.programa?.nombre || '',
        areaId: ficha.areaId,
        areaNombre: ficha.area.nombre || '',
        sedeId: ficha.area.sedeId,
        sedeNombre: ficha.area.sede?.nombre || '',
        centroFormacionId: ficha.area.sede.centroFormacion.id,
        centroFormacionNombre: ficha.area.sede.centroFormacion?.nombre || '',
        locacionId: ficha.area.sede.centroFormacion.locacion.id,
        locacionNombre: ficha.area.sede.centroFormacion.locacion?.nombre || '',
      };
    });
  }

  async findAllByAreas(areaId: number): Promise<FichaDto[]> {
    const result = await this.fichaRepository.find({
      where: { areaId },
      relations: [
        'programa', 'area', 'area.sede', 'area.sede.centroFormacion', 'area.sede.centroFormacion.locacion'
      ],
    });
    return result.map((ficha) => {
      return {
        id: ficha.id,
        codigo: ficha.codigo,
        programaId: ficha.programaId,
        programaNombre: ficha.programa?.nombre || '',
        areaId: ficha.area.sedeId,
        areaNombre: ficha.area.sede?.nombre || '',
        sedeId: ficha.area.sedeId,
        sedeNombre: ficha.area.sede?.nombre || '',
        centroFormacionId: ficha.area.sede.centroFormacion.id,
        centroFormacionNombre: ficha.area.sede.centroFormacion?.nombre || '',
        locacionId: ficha.area.sede.centroFormacion.locacion.id,
        locacionNombre: ficha.area.sede.centroFormacion.locacion?.nombre || '',
      };
    });
  }

  async findOne(id: number): Promise<Ficha> {
    const ficha = await this.fichaRepository.findOne({ where: { id } });
    if (!ficha) {
      throw new NotFoundException(`Ficha #${id} not found`);
    }
    return ficha;
  }
async update(id: number, updateFichaDto: UpdateFichaDto): Promise<Ficha> {
  const ficha = await this.fichaRepository.preload({
    id,
    ...updateFichaDto,
    codigo: updateFichaDto.codigo !== undefined 
      ? String(updateFichaDto.codigo) 
      : undefined,
  });
  if (!ficha) {
    throw new NotFoundException(`Ficha #${id} not found`);
  }
  return await this.fichaRepository.save(ficha);

}
async remove(id: number): Promise<void> {
  const result = await this.fichaRepository.delete(id);
  if (result.affected === 0) {
    throw new NotFoundException(`Ficha #${id} not found`);
  }
}

}
