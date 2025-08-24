import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTipoMovimientoDto {
  @ApiProperty({
    example: 'ENTRADA',
    description: 'Código del tipo de movimiento',
  })
  @IsString()
  codigo: string;

  @ApiProperty({
    example: 'Entrada de productos',
    description: 'Descripción del tipo de movimiento',
  })
  @IsString()
  descripcion: string;

  @ApiProperty({ example: 'IN', description: 'Tipo de movimiento (IN/OUT)' })
  @IsString()
  tipo: string;
}
