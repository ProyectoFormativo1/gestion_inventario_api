import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bodega } from './entities/bodega.entity';
import { CreateBodegaDto } from './dto/create-bodega.dto';
import { UpdateBodegaDto } from './dto/update-bodega.dto';

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

  async findAll(): Promise<Bodega[]> {
    return await this.bodegaRepository.find();
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
