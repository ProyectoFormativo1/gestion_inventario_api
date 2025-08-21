import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CentroFormacionService } from './centro-formacion.service';
import { CreateCentroFormacionDto } from './dto/create-centro-formacion.dto';
import { UpdateCentroFormacionDto } from './dto/update-centro-formacion.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('centroformacion')
export class centroformacionController {
  constructor(private readonly centroformacionService: CentroFormacionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo centro de formacion' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createcentroformacionDto: CreateCentroFormacionDto) {
    return this.centroformacionService.create(createcentroformacionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Devuelve todos los centros de formacion' })
  findAll() {
    return this.centroformacionService.findAll();
  }

  @ApiOperation({ summary: 'Devuelve todos los centros de formacion por locacion (ciudad)' })
  @Get('locacion/:locacionId')
  findAllByLocacion(@Param('locacionId') locacionId: number) {
    return this.centroformacionService.findAllByLocacion(locacionId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.centroformacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatecentroformacionDto: UpdateCentroFormacionDto) {
    return this.centroformacionService.update(+id, updatecentroformacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.centroformacionService.remove(+id);
  }
}
