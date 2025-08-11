import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ambientes')
export class Ambiente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ name: 'ficha_id' })
  fichaId: number;

}
