import { ApiProperty } from '@nestjs/swagger';
export class BodegaDto {
  @ApiProperty({
    description: 'Nombre de la bodega',
  })
  nombre: string;

  @ApiProperty({
    description: 'Descripcion de la bodega',
  })
  descripcion: string;

  @ApiProperty({
    description: 'Responsable de la bodega',
  })
  responsable: string;

  @ApiProperty({
    description: 'Id del area a la que pertenece la bodega',
  })
  areaId: number;

  @ApiProperty({
    description: 'Nombre del area a la que pertenece la bodega',
  })
  areaNombre: string;
    
    @ApiProperty({
    description: 'Id del sede a la que pertenece la bodega',
  })
  sedeId: number;

  @ApiProperty({
    description: 'Nombre del sede a la que pertenece la bodega',
  })
  sedeNombre: string;

  @ApiProperty({
    description: 'Locacion del centro de formacion',
  })
  locacionId: number;

  @ApiProperty({
    description: 'Locacion del centro de formacion',
  })
  locacionNombre: string;

  @ApiProperty({
    description: 'centro de formación al que pertenece la sede',
  })
  centroFormacionId: number;

  @ApiProperty({
    description: 'nombre centro de formación al que pertenece la sede',
  })
  centroFormacionNombre: string;

  @ApiProperty({
    description: 'Total de materiales en la bodega',
  })
  totalMateriales: number;
}
