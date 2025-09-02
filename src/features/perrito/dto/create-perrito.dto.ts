import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

    export class CreatePerritoDto {
        @ApiProperty({
            description: 'Nombre del perrito',
            example: 'Benyi',
        })
        @IsString()
        nombre: string;

        @ApiProperty({
            description: 'Color del perrito',
            example: 'negro',
        })
        @IsString()
        color: string;
    }

