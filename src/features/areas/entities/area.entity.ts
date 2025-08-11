import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('areas')
export class Area {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({ name: 'sede_id'})
    sedeId: number;
}
