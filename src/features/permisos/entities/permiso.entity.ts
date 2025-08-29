import { RolPermiso } from 'src/features/rol-permisos/entities/rol-permiso.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('permisos')
export class Permiso {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column()
  descripcion: string;
  @Column()
  modulo: string;

  @OneToMany(() => RolPermiso, rp => rp.permiso)
  rolPermisos: RolPermiso[];
}
