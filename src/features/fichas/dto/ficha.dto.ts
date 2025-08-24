import { ApiProperty } from '@nestjs/swagger';
export class FichaDto {
  @ApiProperty({
    description: 'Código de la ficha',
  })
  codigo: string;

  @ApiProperty({
    description: 'Fecha de creación de la ficha',
  })
  fechaCreacion: string;

  @ApiProperty({
    description: 'ID del programa asociado',
  })
  programaId: number;

  @ApiProperty({
    description: 'ID del ambiente asociado',
  })
  ambienteId: number;

  @ApiProperty({
    description: 'Nombre del ambiente al que pertenece la ficha',
  })
  ambienteNombre: string;

  @ApiProperty({
    description: 'Nombre del programa a la que pertenece la ficha',
  })
  programaNombre: string;

  @ApiProperty({
    description: 'Id del area a la que pertenece la ficha',
  })
  areaId: number;

  @ApiProperty({
    description: 'Nombre del area a la que pertenece la ficha',
  })
  areaNombre: string;

  @ApiProperty({
    description: 'Id del sede a la que pertenece la ficha',
  })
  sedeId: number;

  @ApiProperty({
    description: 'Nombre del sede a la que pertenece la ficha',
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
