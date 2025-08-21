import { ApiProperty } from '@nestjs/swagger';

export class CentroFormacionDto {
  @ApiProperty({
    description: 'ID del centro de formacion',
  })
  id: number;

  @ApiProperty({
    description: 'Nombre del centro de formacion',
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
}
