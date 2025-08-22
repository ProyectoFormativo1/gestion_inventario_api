import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { BodegaService } from './bodega.service';
import { CreateBodegaDto } from './dto/create-bodega.dto';
import { UpdateBodegaDto } from './dto/update-bodega.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('bodega')
export class BodegasController {
  constructor(private readonly bodegasService: BodegaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva bodega' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBodegaDto: CreateBodegaDto) {
    return this.bodegasService.create(createBodegaDto);
  }

  @Get()
  findAll() {
    return this.bodegasService.findAll();
  }

  @Get('area/:areaId')
  findAllByAreas(@Param('areaId') areaId: number) {
    return this.bodegasService.findAllByAreas(areaId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bodegasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBodegaDto: UpdateBodegaDto) {
    return this.bodegasService.update(+id, updateBodegaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bodegasService.remove(+id);
  }
}
