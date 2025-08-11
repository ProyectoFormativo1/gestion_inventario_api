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
  findAll() {
    return this.sedesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sedesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSedeDto: UpdateSedeDto) {
    return this.sedesService.update(+id, updateSedeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sedesService.remove(+id);
  }
}
