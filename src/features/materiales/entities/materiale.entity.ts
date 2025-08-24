import { Bodega } from 'src/features/bodega/entities/bodega.entity';
import { Movimiento } from 'src/features/movimientos/entities/movimiento.entity';
import { UnidadMedida } from 'src/features/unidad-medida/entities/unidad-medida.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

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

  // 👇 Relación con Bodega
  @ManyToOne(() => Bodega, (bodega) => bodega.materiales)
  @JoinColumn({ name: 'bodega_id' }) // une con la FK
  bodega: Bodega;

  // 👇 Relación con Unidad de Medida
  @ManyToOne(() => UnidadMedida, (unidadMedida) => unidadMedida.materiales)
  @JoinColumn({ name: 'unidad_medida_id' }) // une con la FK
  unidadMedida: UnidadMedida;

  @OneToMany(() => Movimiento, (movimiento) => movimiento.responsable)
  movimientos: Movimiento[];
}
