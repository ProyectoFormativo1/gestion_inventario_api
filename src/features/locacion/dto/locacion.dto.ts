import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TipoLocacion } from '../enum/tipo_locacion';
import { ApiProperty } from '@nestjs/swagger';

export class LocacionDto {
  @ApiProperty({
    description: 'Nombre de la locación',
  })
  nombre: string;

  @ApiProperty({
    description: 'Tipo de locación',
  })
  tipo: TipoLocacion;

  @ApiProperty({
    description: 'codigo postal de la locación',
  })
  codigoPostal: string;

  @ApiProperty({
    description: 'Padreid de la locación',
  })
  parentId?: number;

  @ApiProperty({
    description: 'Padreid de la locación',
  })
  parentNombre?: string;
}
