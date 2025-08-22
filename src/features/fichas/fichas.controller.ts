import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { FichaService } from './fichas.service';
import { CreateFichaDto } from './dto/create-ficha.dto';
import { UpdateFichaDto } from './dto/update-ficha.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('fichas')
export class FichasController {
  constructor(private readonly fichasService: FichaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva ficha' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createFichaDto: CreateFichaDto) {
    return this.fichasService.create(createFichaDto);
  }

  @Get()
  findAll() {
    return this.fichasService.findAll();
  }

  @Get('area/:areaId')
  findAllByAreas(@Param('areaId') areaId: number) {
    return this.fichasService.findAllByAreas(areaId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fichasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFichaDto: UpdateFichaDto) {
    return this.fichasService.update(+id, updateFichaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fichasService.remove(+id);
  }
}
