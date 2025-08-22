import { Area } from 'src/features/areas/entities/area.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('bodega')
export class Bodega {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column()
    responsable: string;

    @Column({ name: 'area_id'})
    areaId: number;

    // 👇 Relación con Sede
    @ManyToOne(() => Area, (area) => area.bodegas)
    @JoinColumn({ name: 'area_id' }) // une con la FK
    area: Area;
}
