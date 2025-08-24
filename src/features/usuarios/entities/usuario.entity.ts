import { Cargo } from 'src/features/cargo/entities/cargo.entity';
import { Movimiento } from 'src/features/movimientos/entities/movimiento.entity';
import { Role } from 'src/features/roles/entities/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombres: string;
  @Column()
  apellidos: string;
  @Column()
  correo: string;

  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
    default: () => ` TIMEZONE('America/Bogota', NOW())`,
  })
  fechacreacion: Date;
  @Column()
  contrasena: string;
  @Column({ name: 'cargo_id' })
  cargoId: number;
  @Column({ name: 'rol_id' })
  rol_id: number;

  // 👇 Relación con Role
  @ManyToOne(() => Role, (role) => role.usuarios)
  @JoinColumn({ name: 'rol_id' }) // une con la FK
  rol: Role;

  // 👇 Relación con Cargo
  @ManyToOne(() => Cargo, (cargo) => cargo.usuarios)
  @JoinColumn({ name: 'cargo_id' }) // une con la FK
  cargo: Cargo;


  @OneToMany(() => Movimiento, (movimiento) => movimiento.responsable)
  movimientos: Movimiento[];
}