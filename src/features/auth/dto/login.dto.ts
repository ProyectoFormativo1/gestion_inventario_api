import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginRequestDto {
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
}


export class LoginResponseDto {
    @ApiProperty({
        description: 'Token de acceso del usuario',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    token: string;

    @ApiProperty({
        description: 'Tiempo de expiración del token de acceso',
        example: 1296000,
    })
    expiresIn: number;
}
