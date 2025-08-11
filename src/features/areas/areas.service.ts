import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from './entities/area.entity';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private readonly AreaRepository: Repository<Area>,
  ) {}

  async create(createAreaDto: CreateAreaDto): Promise<Area> {
    const Area = this.AreaRepository.create(createAreaDto);
    return await this.AreaRepository.save(Area);
  }

  async findAll(): Promise<Area[]> {
    return await this.AreaRepository.find();
  }

  async findOne(id: number): Promise<Area> {
    const Area = await this.AreaRepository.findOne({ where: { id } });
    if (!Area) {
      throw new NotFoundException(`Area #${id} not found`);
    }
    return Area;
  }

  async update(id: number, updateAreaDto: UpdateAreaDto): Promise<Area> {
    const Area = await this.AreaRepository.preload({
      id,
      ...updateAreaDto,
    });
    if (!Area) {
      throw new NotFoundException(`Area #${id} not found`);
    }
    return await this.AreaRepository.save(Area);
  }

  async remove(id: number): Promise<void> {
    const result = await this.AreaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Area #${id} not found`);
    }
  }
}
