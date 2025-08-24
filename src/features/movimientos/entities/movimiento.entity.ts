import { Material } from 'src/features/materiales/entities/materiale.entity';
import { TipoMovimiento } from 'src/features/tipo-movimiento/entities/tipo-movimiento.entity';
import { Usuario } from 'src/features/usuarios/entities/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity('movimientos')
export class Movimiento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidad: number;

  @Column({
    name: 'fecha',
    type: 'timestamp',
    default: () => `TIMEZONE('America/Bogota', NOW())`,
    onUpdate: `TIMEZONE('America/Bogota', NOW())`,
  })
  fecha: Date;

  @Column()
  observaciones: string;

  @Column({ name: 'material_id' })
  materialId: number;

  @Column({ name: 'responsable_id' })
  responsableId: number;

  @Column({ name: 'tipo_movimiento_id' })
  tipoMovimientoId: number;

  // 👇 Relación con Material
  @ManyToOne(() => Material, (material) => material.movimientos)
  @JoinColumn({ name: 'material_id' }) // une con la FK
  material: Material;

  // 👇 Relación con Usuario
  @ManyToOne(() => Usuario, (usuario) => usuario.movimientos)
  @JoinColumn({ name: 'responsable_id' }) // une con la FK
  responsable: Usuario;

  // 👇 Relación con Tipo de Movimiento
  @ManyToOne(() => TipoMovimiento, (tipoMovimiento) => tipoMovimiento.movimientos)
  @JoinColumn({ name: 'tipo_movimiento_id' }) // une con la FK
  tipoMovimiento: TipoMovimiento;

}
