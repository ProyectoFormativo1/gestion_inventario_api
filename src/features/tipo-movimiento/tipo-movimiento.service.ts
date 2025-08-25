import { Injectable } from '@nestjs/common';
import { CreateTipoMovimientoDto } from './dto/create-tipo-movimiento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoMovimiento } from './entities/tipo-movimiento.entity';
import { Repository } from 'typeorm';
import { TipoMovimientoDto } from './dto/tipo-movimiento.dto';
import { TipoMovimientoEnum } from './entities/tipo-movimeinto.enum';

@Injectable()
export class TipoMovimientoService {

  constructor(
    @InjectRepository(TipoMovimiento)
    private readonly tipoMovimientoRepository: Repository<TipoMovimiento>,
  ) { }


  create(createTipoMovimientoDto: CreateTipoMovimientoDto) {
    const tipoMovimiento = this.tipoMovimientoRepository.create(createTipoMovimientoDto);
    return this.tipoMovimientoRepository.save(tipoMovimiento);
  }

  findAll(): Promise<TipoMovimientoDto[]> {
    return this.tipoMovimientoRepository.find();
  }

  findOneById(id: number): Promise<TipoMovimientoDto | null> {
    return this.tipoMovimientoRepository.findOne({ where: { id: id } });
  }
}
