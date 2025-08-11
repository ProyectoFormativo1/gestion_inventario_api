import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMaterialDto {
  @ApiProperty({
    description: 'Nombre del material',
    example: 'Cemento gris Portland',
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Cantidad en stock',
    example: 150,
  })
  @IsNumber()
  stok: number;

  @ApiProperty({
    description: 'Número de contrato relacionado al material',
    example: 'CT-2025-001',
  })
  @IsString()
  numero_contrato: string;

  @ApiProperty({
    description: 'Fecha de vencimiento del material',
    example: '2025-12-31T00:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  fecha_vencimiento?: string;

  @ApiProperty({
    description: 'Fecha de vigencia del material',
    example: '2025-12-31T00:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  fecha_vigencia?: string;

  @ApiProperty({
    description: 'Código SENA del material',
    example: 'SENA12345',
  })
  @IsString()
  codigo_sena: string;

  @ApiProperty({
    description: 'Código UNSPSC del material',
    example: '30111506',
  })
  @IsString()
  codigo_unspsc: string;

  @ApiProperty({
    description: 'Tipo de material',
    example: 'consumible',
  })
  @IsString()
  tipo: string;

  @ApiProperty({
    description: 'ID de la bodega donde se almacena',
    example: 2,
  })
  @IsNumber()
  bodega_id: number;

  @ApiProperty({
    description: 'ID de la unidad de medida',
    example: 1,
  })
  @IsNumber()
  unidad_medida_id: number;
}
