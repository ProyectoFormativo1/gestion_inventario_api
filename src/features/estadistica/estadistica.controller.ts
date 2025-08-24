import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadisticaService } from './estadistica.service';

@Controller('estadistica')
export class EstadisticaController {
  constructor(private readonly estadisticaService: EstadisticaService) {}
  @Get()
  findAll() {
    return this.estadisticaService.findAll();
  }
}
