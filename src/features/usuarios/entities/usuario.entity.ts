import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombres: string;
  @Column()
  apellidos: string;
  @Column()
  correo:string;

  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
    default: () => ` TIMEZONE('America/Bogota', NOW())`,
  })
  fechacreacion:Date
  @Column()
  contrasena: string;
  @Column({ name: 'cargo_id' })
  cargoId: number;
  @Column({ name: 'rol_id' })
  rol_id: number;
  
}
