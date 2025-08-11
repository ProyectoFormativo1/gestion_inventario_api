import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('programas')
export class Programa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({ name: 'area_id' })
    areaId: number;
}
