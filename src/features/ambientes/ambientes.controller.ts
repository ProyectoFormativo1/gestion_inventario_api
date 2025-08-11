import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AmbientesService } from './ambientes.service';
import { CreateAmbienteDto } from './dto/create-ambiente.dto';
import { UpdateAmbienteDto } from './dto/update-ambiente.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('ambientes')
export class AmbientesController {
  constructor(private readonly ambientesService: AmbientesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo ambiente' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAmbienteDto: CreateAmbienteDto) {
    return this.ambientesService.create(createAmbienteDto);
  }

  @Get()
  findAll() {
    return this.ambientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ambientesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAmbienteDto: UpdateAmbienteDto) {
    return this.ambientesService.update(+id, updateAmbienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ambientesService.remove(+id);
  }
}
