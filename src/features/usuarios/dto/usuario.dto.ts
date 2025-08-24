import { ApiProperty } from "@nestjs/swagger";

export class UsuarioDto {
     @ApiProperty({
        description: 'Id del usuario'
    })
    id: number;

    @ApiProperty({
        description: 'Nombres del usuario'
    })
    nombres: string;

    @ApiProperty({
        description: 'Apellidos del usuario'
    })
    apellidos: string;

    @ApiProperty({
        description: 'Email del usuario'
    })
    correo: string;

    @ApiProperty({
        description: 'ID del cargo asociado al usuario'
    })
    cargoId: number;

    @ApiProperty({
        description: 'ID del rol asociado al usuario'
    })
    rolId: number;

     @ApiProperty({
        description: 'Fecha de creacion del usuario',
    })
     fechaCreacion: string;

    @ApiProperty({
        description: 'Nombre del cargo asociado al usuario',
    })
    cargoNombre?: string;
    @ApiProperty({
        description: 'Nombre del rol asociado al usuario',
    })
    rolNombre?: string;
}
