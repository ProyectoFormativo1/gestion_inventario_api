import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('materiales')
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  stok: number;

  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
    default: () => `TIMEZONE('America/Bogota', NOW())`,
  })
  fecha_creacion: Date;

  @Column({
    name: 'fecha_actualizacion',
    type: 'timestamp',
    default: () => `TIMEZONE('America/Bogota', NOW())`,
    onUpdate: `TIMEZONE('America/Bogota', NOW())`,
  })
  fecha_actualizacion: Date;

  @Column()
  numero_contrato: string;

  @Column({ type: 'timestamp' })
  fecha_vencimiento: Date;
  
  @Column({ type: 'timestamp' })
  fecha_vigencia: Date;

  @Column()
  codigo_sena: string;

  @Column()
  codigo_unspsc: string;

  @Column()
  tipo: string;

  @Column({ name: 'bodega_id' })
  bodega_id: number;

  @Column({ name: 'unidad_medida_id' })
  unidad_medida_id: number;
}
