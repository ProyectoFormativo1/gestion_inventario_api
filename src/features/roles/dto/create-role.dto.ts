import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
     @ApiProperty({
            description: 'Nombre del rol',
            example: 'administrador',
        })
    @IsString()
    nombre: string;
     @ApiProperty({
            description: 'Codigo del rol',
            example: 'ADMIN',
        })
    @IsString()
    codigo: string;
}
