import { Locacion } from 'src/features/locacion/entities/locacion.entity';
import { Sede } from 'src/features/sedes/entities/sede.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
@Entity('centroformacion')
export class CentroFormacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ name: 'locacion_id', nullable: true })
  locacionId?: number;

  // 👇 Relación con Locacion
  @ManyToOne(() => Locacion, (locacion) => locacion.centros)
  @JoinColumn({ name: 'locacion_id' }) // une con la FK
  locacion: Locacion;

  // 👇 Relación con Sedes
  @OneToMany(() => Sede, (sede) => sede.centroFormacion)
  centros: Sede[];
}
