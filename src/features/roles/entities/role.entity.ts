import { RolPermiso } from 'src/features/rol-permisos/entities/rol-permiso.entity';
import { Usuario } from 'src/features/usuarios/entities/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  codigo: string;

  // 👇 Relación con Usuario
  @OneToMany(() => Usuario, (usuario) => usuario.cargo)
  usuarios: Usuario[];

   @OneToMany(() => RolPermiso, rp => rp.rol)
  rolPermisos: RolPermiso[];
}
