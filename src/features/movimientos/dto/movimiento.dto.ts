import { ApiProperty } from '@nestjs/swagger';

export class MovimientoDto {
  @ApiProperty({
    description: 'Id del movimiento',
  })
  id: number;

  @ApiProperty({
    description: 'Cantidad del material en el movimiento',
  })
  cantidad: number;

  @ApiProperty({
    description: 'Fecha del movimiento',
  })
  fecha: string;

  @ApiProperty({
    description: 'Observaciones adicionales del movimiento',
  })
  observaciones: string;

  @ApiProperty({
    description: 'ID del material asociado',
  })
  materialId: number;

  @ApiProperty({
    description: 'ID del responsable en la base de datos',
  })
  responsableId: number;

  @ApiProperty({
    description: 'ID del tipo de movimiento',
  })
  tipoMovimientoId: number;

  @ApiProperty({
    description: 'Nombre del material asociado',
  })
  materialNombre: string;

  @ApiProperty({
    description: 'Nombre del responsable asociado',
  })
  responsableNombre: string;

  @ApiProperty({
    description: 'Descripción del tipo de movimiento',
  })
  tipoMovimientoDescripcion: string;

  @ApiProperty({
    description: 'Nombre del tipo de movimiento',
  })
  tipoMovimientoNombre: string;

  @ApiProperty({
    description: 'Código del tipo de movimiento',
  })
  tipoMovimientoCodigo: string;
}
