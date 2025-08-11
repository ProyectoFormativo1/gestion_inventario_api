
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cargo')
export class Cargo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;
}
