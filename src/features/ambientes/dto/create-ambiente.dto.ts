import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateAmbienteDto {
    @ApiProperty({
        description: 'Nombre del ambiente',
        example: 'Y151',
    })
    @IsString()
    nombre: string;

    @ApiProperty({
        description: 'Id del area a la que pertenece el ambiente',
        example: 3,
    })
    @IsNumber()
    areaId: number;
}
