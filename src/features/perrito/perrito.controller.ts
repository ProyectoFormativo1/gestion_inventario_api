import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PerritoService } from './perrito.service';
import { CreatePerritoDto } from './dto/create-perrito.dto';
import { UpdatePerritoDto } from './dto/update-perrito.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('perrito')
export class PerritoController {
  constructor(private readonly perritoService: PerritoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo perrito' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPerritoDto: CreatePerritoDto) {
    return this.perritoService.create(createPerritoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los perritos' })
  findAll() {
    return this.perritoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un perrito por ID' })
  findOne(@Param('id') id: string) {
    return this.perritoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un perrito' })
  update(@Param('id') id: string, @Body() updatePerritoDto: UpdatePerritoDto) {
    return this.perritoService.update(+id, updatePerritoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un perrito' })
  remove(@Param('id') id: string) {
    return this.perritoService.remove(+id);
  }
}
