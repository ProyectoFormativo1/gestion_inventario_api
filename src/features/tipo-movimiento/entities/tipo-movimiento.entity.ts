import { Movimiento } from 'src/features/movimientos/entities/movimiento.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('tipo_movimiento')
export class TipoMovimiento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigo: string;

  @Column()
  descripcion: string;

  @Column()
  tipo: string;

  // 👇 Relación con Movimientos
  @OneToMany(() => Movimiento, (movimiento) => movimiento.tipoMovimiento)
  movimientos: Movimiento[];
}
