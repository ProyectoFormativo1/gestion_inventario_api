import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('sedes')
export class Sede {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ name: 'centro_formacion_id' })
  centroFormacionId: number;
}
