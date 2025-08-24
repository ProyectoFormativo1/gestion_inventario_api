import { IsEmail, IsString, IsNumber, IsDateString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
      @ApiProperty({
            description: 'Nombres del usuario',
            example: 'Daniela',
        })
    @IsString()
    nombres: string;
    @ApiProperty({
        description: 'Apellidos del usuario',
        example: 'Gómez Pérez',
    })
    @IsString()
    apellidos: string;
    @ApiProperty({
        description: 'Email del usuario',
        example: 'daniel@gmail.com',
    })
    @IsEmail()
    correo: string;
    @IsString()
    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'password123',
    })
    contrasena: string;
    @IsNumber()
    @ApiProperty({
        description: 'ID del cargo asociado al usuario',
        example: 1,
    })
    cargoId: number;
    @ApiProperty({
        description: 'ID del rol asociado al usuario',
        example: 1,
    })
    @IsNumber()
    rolId: number;
}
