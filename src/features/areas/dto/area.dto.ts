import { ApiProperty } from '@nestjs/swagger';
export class AreaDto {
  @ApiProperty({
    description: 'Id del area',
  })
  id: number;
  @ApiProperty({
    description: 'Nombre del area',
  })
  nombre: string;

  @ApiProperty({
    description: 'Id de la sede a la que pertenece el area',
  })
  sedeId: number;

  @ApiProperty({
    description: 'Nombre de la sede',
  })
  sedeNombre: string;

  @ApiProperty({
    description: 'Locacion del area',
  })
  locacionId: number;

  @ApiProperty({
    description: 'Locacion de la area',
  })
  locacionNombre: string;

  @ApiProperty({
    description: 'centro de formación al que pertenece la area',
  })
  centroFormacionId: number;

  @ApiProperty({
    description: 'nombre centro de formación al que pertenece la area',
  })
  centroFormacionNombre: string;
}
