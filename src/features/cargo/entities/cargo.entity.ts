import { Usuario } from 'src/features/usuarios/entities/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('cargo')
export class Cargo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  // 👇 Relación con Usuario
  @OneToMany(() => Usuario, (usuario) => usuario.cargo)
  usuarios: Usuario[];
}
