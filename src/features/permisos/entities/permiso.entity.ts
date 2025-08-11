import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('permisos')
export class Permiso {@PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    descripcion: string;
    
}
