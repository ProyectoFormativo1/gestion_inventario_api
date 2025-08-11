import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUnidadMedidaDto {
    @ApiProperty({
        description: 'Nombre de la unidad de medida',
        example: 'Metro',
    })
    @IsString()
    nombre: string;

    @ApiProperty({
        description: 'Símbolo de la unidad de medida',
        example: 'm',
    })
    @IsString()
    simbolo: string;

    @ApiProperty({
        description: 'Tipo de unidad de medida',
        example: 'Longitud',
    })
    @IsString()
    tipo: string;

    @ApiProperty({
        description: 'Descripción adicional de la unidad de medida',
        example: 'Unidad utilizada para medir distancias',
        required: false,
    })
    @IsOptional()
    @IsString()
    descripcion?: string;
}
