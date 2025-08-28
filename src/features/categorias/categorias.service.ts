import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { CategoriaDto } from './dto/categoria-dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const categoria = this.categoriaRepository.create({
      ...createCategoriaDto,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    });
    return await this.categoriaRepository.save(categoria);
  }

  async findAll(): Promise<CategoriaDto[]> {
    const result = await this.categoriaRepository.find();
    return result.map((categoria) => {
      return {
        id: categoria.id,
        nombre: categoria.nombre,
        codigoUnspsc: categoria.codigoUnspsc,
        fechaCreacion: categoria.fechaCreacion,
        fechaActualizacion: categoria.fechaActualizacion,
      };
    });
  }

  async findOne(id: number): Promise<CategoriaDto> {
    const categoria = await this.categoriaRepository.findOne({ where: { id } });
    if (!categoria) {
      throw new NotFoundException(`Categoria #${id} not found`);
    }
    return {
      id: categoria.id,
      nombre: categoria.nombre,
      codigoUnspsc: categoria.codigoUnspsc,
      fechaCreacion: categoria.fechaCreacion,
      fechaActualizacion: categoria.fechaActualizacion,
    };
  }

  async update(
    id: number,
    updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<Categoria> {
    const categoria = await this.categoriaRepository.preload({
      id,
      ...updateCategoriaDto,
      fechaActualizacion: new Date(),
    });
    if (!categoria) {
      throw new NotFoundException(`Categoria #${id} not found`);
    }
    return await this.categoriaRepository.save(categoria);
  }

  async remove(id: number): Promise<void> {
    const result = await this.categoriaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Categoria #${id} not found`);
    }
  }
}
