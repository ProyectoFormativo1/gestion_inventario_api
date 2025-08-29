
import { Permiso } from 'src/features/permisos/entities/permiso.entity';
import { Role } from 'src/features/roles/entities/role.entity';
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';


@Entity('rol_permisos')
export class RolPermiso {
  @PrimaryColumn({ name: 'rol_id', type: 'bigint' })
  rolId: number;

  @PrimaryColumn({ name: 'permiso_id', type: 'bigint' })
  permisoId: number;

  @ManyToOne(() => Role, rol => rol.rolPermisos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'rol_id' })
  rol: Role;

  @ManyToOne(() => Permiso, permiso => permiso.rolPermisos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'permiso_id' })
  permiso: Permiso;
}
