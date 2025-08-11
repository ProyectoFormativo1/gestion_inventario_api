import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateAreaDto {
     @ApiProperty({
        description: 'Nombre del area',
        example: 'TIC',
    })
    @IsString()
    nombre: string;

    @ApiProperty({
        description: 'Id de la sede a la que pertenece el area',
        example: 3,
    })
    @IsNumber()
    sedeId: number;
}









    

