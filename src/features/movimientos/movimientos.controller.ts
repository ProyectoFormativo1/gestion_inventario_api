import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('movimientos')
export class MovimientosController {
  constructor(private readonly movimientosService: MovimientosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo movimiento' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMovimientoDto: CreateMovimientoDto) {
    return this.movimientosService.create(createMovimientoDto);
  }

  @Get()
  findAll() {
    return this.movimientosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimientosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovimientoDto: UpdateMovimientoDto) {
    return this.movimientosService.update(+id, updateMovimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movimientosService.remove(+id);
  }
}
