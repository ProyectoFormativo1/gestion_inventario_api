import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsString } from "class-validator";
import { UsuarioDto } from "src/features/usuarios/dto/usuario.dto";

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
        description: 'Token de acceso del usuario'
    })
    token: string;

    @ApiProperty({
        description: 'Tiempo de expiración del token de acceso'
    })
    expiresIn: number;

    @ApiProperty({
        description: 'Usuario'
    })
    @Type(() => UsuarioDto)
    user: UsuarioDto;

}
