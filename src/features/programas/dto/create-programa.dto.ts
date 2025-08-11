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
            description: 'Id del área a la que pertenece el programa',
            example: 5,
        })
        @IsNumber()
        areaId: number;
    }

