import { IsNumber, IsString, IsDateString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateFichaDto {
    @ApiProperty({
        description: 'Código de la ficha',
        example: 'F12345',
    })
    @IsString()
    codigo: string;
    
    @ApiProperty({
        description: 'ID del programa asociado',
        example: 1,
    })
    @IsNumber()
    programaId: number;

    @ApiProperty({
        description: 'ID del ambiente',
        example: 1,
    })
    @IsNumber()
    ambienteId: number;
}

