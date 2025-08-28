import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'Herramientas',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'Código UNSPSC de la categoría',
    example: '12345678',
  })
  @IsString()
  @IsNotEmpty()
  codigoUnspsc: string;
}
