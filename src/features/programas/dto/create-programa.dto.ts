import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

    export class CreateProgramaDto {
        @ApiProperty({
            description: 'Nombre del programa',
            example: 'Ingeniería de Sistemas',
        })
        @IsString()
        nombre: string;

        @ApiProperty({
            description: 'Descripción del  programa',
            example: 'desarrollo',
        })
        @IsString()
        descripcion: string;
    }

