import { IsNumber, IsString, IsDateString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMovimientoDto {
  @ApiProperty({
    description: 'Cantidad del material en el movimiento',
    example: 10,
  })
  @IsNumber()
  cantidad: number;

  @ApiProperty({
    description: 'Observaciones adicionales del movimiento',
    example: 'Ingreso por compra directa',
  })
  @IsString()
  observaciones: string;

  @ApiProperty({
    description: 'ID del material asociado',
    example: 3,
  })
  @IsNumber()
  materialId: number;

  @ApiProperty({
    description: 'ID del responsable en la base de datos',
    example: 1,
  })
  @IsNumber()
  responsableId: number;

  @ApiProperty({
    description: 'ID del tipo de movimiento',
    example: 2,
  })
  @IsNumber()
  tipoMovimientoId: number;
}
