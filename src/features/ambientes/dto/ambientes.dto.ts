import { ApiProperty } from '@nestjs/swagger';
export class AmbienteDto {
  @ApiProperty({
    description: 'Id del ambiente',
  })
  id: number;

  @ApiProperty({
    description: 'Nombre de la ambiente',
  })
  nombre: string;

  @ApiProperty({
    description: 'Id del area a la que pertenece la ambiente',
  })
  areaId: number;

  @ApiProperty({
    description: 'Nombre del area a la que pertenece la ambiente',
  })
  areaNombre: string;

  @ApiProperty({
    description: 'Id del sede a la que pertenece la ambiente',
  })
  sedeId: number;

  @ApiProperty({
    description: 'Nombre del sede a la que pertenece la ambiente',
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
}
