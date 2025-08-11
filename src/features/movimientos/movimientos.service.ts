import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movimiento } from './entities/movimiento.entity';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';

@Injectable()
export class MovimientosService {
  constructor(
    @InjectRepository(Movimiento)
    private readonly movimientoRepository: Repository<Movimiento>,
  ) {}

  async create(createMovimientoDto: CreateMovimientoDto): Promise<Movimiento> {
    const movimiento = this.movimientoRepository.create({
      ...createMovimientoDto,
    });
    return await this.movimientoRepository.save(movimiento);
  }

  async findAll(): Promise<Movimiento[]> {
    return await this.movimientoRepository.find();
  }

  async findOne(id: number): Promise<Movimiento> {
    const movimiento = await this.movimientoRepository.findOne({ where: { id } });
    if (!movimiento) {
      throw new NotFoundException(`Movimiento #${id} no encontrado`);
    }
    return movimiento;
  }

  async update(id: number, updateMovimientoDto: UpdateMovimientoDto): Promise<Movimiento> {
    const movimiento = await this.movimientoRepository.preload({
      id,
      ...updateMovimientoDto,
    });
    if (!movimiento) {
      throw new NotFoundException(`Movimiento #${id} no encontrado`);
    }
    return await this.movimientoRepository.save(movimiento);
  }

  async remove(id: number): Promise<void> {
    const result = await this.movimientoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Movimiento #${id} no encontrado`);
    }
  }
}
