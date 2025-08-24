import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TipoMovimientoDto {
  @ApiProperty({
    description: 'Código del tipo de movimiento',
  })
  @IsString()
  codigo: string;

  @ApiProperty({
    description: 'Descripción del tipo de movimiento',
  })
  @IsString()
  descripcion: string;

  @ApiProperty({ description: 'Tipo de movimiento (IN/OUT)' })
  @IsString()
  tipo: string;
}
