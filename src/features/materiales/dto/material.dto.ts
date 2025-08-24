import { ApiProperty } from '@nestjs/swagger';

export class MaterialDto {
    @ApiProperty({
        description: 'Nombre del material',
    })
    nombre: string;

    @ApiProperty({
        description: 'Cantidad en stock',
    })
    stok: number;

    @ApiProperty({
        description: 'Número de contrato relacionado al material',
    })
    numero_contrato: string;

    @ApiProperty({
        description: 'Fecha de vencimiento del material',
    })
    fecha_vencimiento?: string;

    @ApiProperty({
        description: 'Fecha de vigencia del material',
    })
    fecha_vigencia?: string;


     @ApiProperty({
        description: 'Fecha de creacion del material',
    })
    fecha_creacion: string;

    @ApiProperty({
        description: 'Fecha de ultima actualizacion del material',
    })
    fecha_actualizacion: string;

    @ApiProperty({
        description: 'Código SENA del material',
    })
    codigo_sena: string;

    @ApiProperty({
        description: 'Código UNSPSC del material',
    })
    codigo_unspsc: string;

    @ApiProperty({
        description: 'Tipo de material',
    })
    tipo: string;

    @ApiProperty({
        description: 'ID de la bodega donde se almacena',
    })
    bodega_id: number;

    @ApiProperty({
        description: 'ID de la unidad de medida',
    })
    unidad_medida_id: number;

    @ApiProperty({
        description: 'Nombre de la unidad de medida',
    })
    unidadMedidaNombre: string;

    @ApiProperty({
        description: 'Nombre de la bodega donde se almacena',
    })
    bodegaNombre: string;
}
