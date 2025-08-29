import { ApiProperty } from '@nestjs/swagger';

export class PermisoDto {
  @ApiProperty({ description: 'Id del permiso' })
  id: number;

  @ApiProperty({ description: 'Nombre del permiso' })
  nombre: string;

  @ApiProperty({ description: 'Descripción del permiso' })
  descripcion: string;

  @ApiProperty({ description: 'Módulo al que pertenece el permiso' })
  modulo: string;

  @ApiProperty({
    description: 'Indica si el permiso está asignado al rol',
    example: true,
  })
  asignado: boolean;
}

export class RolPermisoDto {
  @ApiProperty({ description: 'Id del rol'})
  rolId: number;
  @ApiProperty({ description: 'Nombre del rol' })
  rolNombre: string;
  @ApiProperty({ description: 'Nombre del módulo' })
  modulo: string;

  @ApiProperty({
    type: [PermisoDto],
    description: 'Lista de permisos del módulo',
  })
  permisos: PermisoDto[];
}
