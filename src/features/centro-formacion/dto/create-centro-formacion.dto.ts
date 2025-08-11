import { IsNumber, IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateCentroFormacionDto {
    @ApiProperty({
        description: 'Nombre del centro de formacion',
        example: 'Centro de Gestion y Desarrollo',
    })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({
        description: 'Locacion del centro de formacion',
        example: 2,
    })
    @IsNumber()
    @IsNotEmpty()
    locacionId: number;
}
