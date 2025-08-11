import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('fichas')
export class Ficha {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigo: string;

  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
    default: () =>` TIMEZONE('America/Bogota', NOW())`,
  })
  creacionfecha: Date;
  @Column({ name: 'programa_id' })
  programaId: number;
}
