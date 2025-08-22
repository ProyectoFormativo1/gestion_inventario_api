import { ApiProperty } from '@nestjs/swagger';
export class SedeDto {
  @ApiProperty({
    description: 'Nombre de la sede',
  })
  nombre: string;

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
