import { ApiProperty } from '@nestjs/swagger';

export class CategoriaDto {
  @ApiProperty({
    description: 'ID de la categoría',
  })
  id: number;

  @ApiProperty({
    description: 'Nombre de la categoría',
  })
  nombre: string;

  @ApiProperty({
    description: 'Código UNSPSC de la categoría',
  })
  codigoUnspsc: string;

  @ApiProperty({
    description: 'Fecha de creación de la categoría',
  })
  fechaCreacion: Date;

  @ApiProperty({
    description: 'Fecha de última actualización de la categoría',
  })
  fechaActualizacion: Date;
}
