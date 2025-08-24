import { Controller, Get, Post, Body } from '@nestjs/common';
import { TipoMovimientoService } from './tipo-movimiento.service';
import { CreateTipoMovimientoDto } from './dto/create-tipo-movimiento.dto';

@Controller('tipo-movimiento')
export class TipoMovimientoController {
  constructor(private readonly tipoMovimientoService: TipoMovimientoService) {}

  @Post()
  create(@Body() createTipoMovimientoDto: CreateTipoMovimientoDto) {
    return this.tipoMovimientoService.create(createTipoMovimientoDto);
  }

  @Get()
  findAll() {
    return this.tipoMovimientoService.findAll();
  }
}
