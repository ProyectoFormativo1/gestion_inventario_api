import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AreaService } from './areas.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva área' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAreaDto: CreateAreaDto) {
    return this.areasService.create(createAreaDto);
  }

  @Get()
  findAll() {
    return this.areasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.areasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAreaDto: UpdateAreaDto) {
    return this.areasService.update(+id, updateAreaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.areasService.remove(+id);
  }
}
