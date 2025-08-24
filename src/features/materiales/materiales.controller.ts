import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MaterialesService } from './materiales.service';
import { CreateMaterialDto } from './dto/create-materiale.dto';
import { UpdateMaterialeDto } from './dto/update-materiale.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('materiales')
export class MaterialesController {
  constructor(private readonly materialesService: MaterialesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo material' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMaterialeDto: CreateMaterialDto) {
    return this.materialesService.create(createMaterialeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los materiales' })
  findAll() {
    return this.materialesService.findAll();
  }

  @Get('bodega/:bodegaId')
  @ApiOperation({ summary: 'Obtener materiales por ID de bodega' })
  findAllByBodegaId(@Param('bodegaId') bodegaId: number) {
    return this.materialesService.findAllByBodegaId(bodegaId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMaterialeDto: UpdateMaterialeDto,
  ) {
    return this.materialesService.update(+id, updateMaterialeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialesService.remove(+id);
  }
}
