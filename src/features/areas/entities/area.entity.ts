import { Bodega } from 'src/features/bodega/entities/bodega.entity';
import { Ficha } from 'src/features/fichas/entities/ficha.entity';
import { Sede } from 'src/features/sedes/entities/sede.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('areas')
export class Area {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({ name: 'sede_id'})
    sedeId: number;


    // 👇 Relación con Sede
    @ManyToOne(() => Sede, (sede) => sede.areas)
    @JoinColumn({ name: 'sede_id' }) // une con la FK
    sede: Sede;

    // 👇 Relación con Areas
    @OneToMany(() => Bodega, (bodega) => bodega.area)
    bodegas: Bodega[];

    // 👇 Relación con Fichas
    @OneToMany(() => Ficha, (ficha) => ficha.area)
    fichas: Ficha[];
}
