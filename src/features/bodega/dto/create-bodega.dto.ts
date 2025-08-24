import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBodegaDto {
  @ApiProperty({
    description: 'Nombre de la bodega',
    example: 'TIC',
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Descripción de la bodega',
    example: 'Bodega de Tecnologías de la Información y Comunicaciones',
  })
  @IsString()
  descripcion: string;

  @ApiProperty({
    description: 'Id del area a la que pertenece la bodega',
    example: 5,
  })
  @IsNumber()
  areaId: number;
}
