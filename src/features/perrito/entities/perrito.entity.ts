import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('perrito')
export class Perrito {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    color: string;

}
