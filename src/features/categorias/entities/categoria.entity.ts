import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Material } from 'src/features/materiales/entities/materiale.entity';

@Entity('categoria')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ name: 'codigo_unspsc', type: 'varchar', length: 50 })
  codigoUnspsc: string;

  @Column({ name: 'fecha_creacion', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;

  @Column({
    name: 'fecha_actualizacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  fechaActualizacion: Date;

  @OneToMany(() => Material, (material) => material.categoria)
  materiales: Material[];
}
