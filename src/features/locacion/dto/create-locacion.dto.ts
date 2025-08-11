import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TipoLocacion } from '../enum/tipo_locacion';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocacionDto {
  @ApiProperty({
    description: 'Nombre de la locación',
    example: 'Pitalito',
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Tipo de locación',
    example: TipoLocacion.ciudad,
  })
  @IsEnum(TipoLocacion)
  tipo: TipoLocacion;

  
  @IsString()
  @ApiProperty({
    description: 'codigo postal de la locación',
    example: '40001',
  })
  codigoPostal: string;
  @IsOptional()

  @ApiProperty({
    description: 'Padreid de la locación',
    example: 1,
  })
  @IsNumber()
  parentId: number;
}
