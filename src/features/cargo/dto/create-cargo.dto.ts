import {  IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class CreateCargoDto {
    @ApiProperty({
            description: 'Nombre del cargo',
            example: 'Gerente de TIC',
        })
    @IsString()
    nombre: string;
}
