import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { LocacionService } from './locacion.service';
import { CreateLocacionDto } from './dto/create-locacion.dto';
import { UpdateLocacionDto } from './dto/update-locacion.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('locacion')
export class LocacionController {
  constructor(private readonly locacionService: LocacionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva locación' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createLocacionDto: CreateLocacionDto) {
    return this.locacionService.create(createLocacionDto);
  }

  @Get()
  findAll() {
    return this.locacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocacionDto: UpdateLocacionDto) {
    return this.locacionService.update(+id, updateLocacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locacionService.remove(+id);
  }
}
