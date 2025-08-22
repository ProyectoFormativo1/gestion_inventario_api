import { Ficha } from 'src/features/fichas/entities/ficha.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('programas')
export class Programa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;


    // 👇 Relación con Fichas
    @OneToMany(() => Ficha, (ficha) => ficha.programa)
    fichas: Ficha[];
}
