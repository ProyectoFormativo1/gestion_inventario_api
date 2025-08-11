import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('centroformacion')
export class CentroFormacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ name: 'locacion_id', nullable: true })
  locacionId?: number;
}
