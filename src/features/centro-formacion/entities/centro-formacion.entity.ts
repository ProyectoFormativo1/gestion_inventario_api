import { Locacion } from 'src/features/locacion/entities/locacion.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
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
}
