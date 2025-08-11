import {  IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermisoDto {
        @ApiProperty({
                description: 'Nombre del permiso',
                example: 'Acceso a inventario',
            })
    @IsString()
    nombre: string;
    @ApiProperty({
                description: 'Descripción del permiso',
                example: 'Permiso para acceder a la gestión de inventario',
            })
    @IsString()
    descripcion: string;
    
}


