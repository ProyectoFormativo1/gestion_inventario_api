import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ficha } from './entities/ficha.entity';
import { CreateFichaDto } from './dto/create-ficha.dto';
import { UpdateFichaDto } from './dto/update-ficha.dto';

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

  async findAll(): Promise<Ficha[]> {
    return await this.fichaRepository.find();
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
