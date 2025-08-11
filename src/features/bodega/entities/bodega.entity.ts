import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('bodega')
export class Bodega {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({ name: 'area_id'})
    areaId: number;
}
