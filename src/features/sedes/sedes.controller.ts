import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { SedeService } from './sedes.service';
import { CreateSedeDto } from './dto/create-sede.dto';
import { UpdateSedeDto } from './dto/update-sede.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('sedes')
export class SedesController {
  constructor(private readonly sedesService: SedeService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva sede' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSedeDto: CreateSedeDto) {
    return this.sedesService.create(createSedeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las sedes' })
  findAll() {
    return this.sedesService.findAll();
  }

  @ApiOperation({ summary: 'Devuelve todos las sede  por centroFormacion' })
  @Get('centroformacion/:centroFormacionId')
  findAllByCentroFormacion(@Param('centroFormacionId') centroFormacionId: number) {
    return this.sedesService.findAllByCentroFormacion(centroFormacionId);
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una sede por ID' })
  findOne(@Param('id') id: string) {
    return this.sedesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una sede' })
  update(@Param('id') id: string, @Body() updateSedeDto: UpdateSedeDto) {
    return this.sedesService.update(+id, updateSedeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una sede' })
  remove(@Param('id') id: string) {
    return this.sedesService.remove(+id);
  }
}
