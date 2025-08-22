import { Area } from 'src/features/areas/entities/area.entity';
import { CentroFormacion } from 'src/features/centro-formacion/entities/centro-formacion.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
@Entity('sedes')
export class Sede {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ name: 'centro_formacion_id' })
  centroFormacionId: number;

  // 👇 Relación con Locacion
  @ManyToOne(() => CentroFormacion, (locacion) => locacion.centros)
  @JoinColumn({ name: 'centro_formacion_id' }) // une con la FK
  centroFormacion: CentroFormacion;

  // 👇 Relación con Areas
  @OneToMany(() => Area, (sede) => sede.sede)
  areas: Area[];
}
