import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
  tipo: string;

  @Column()
  observaciones: string;

  @Column({ name: 'material_id' })
  materialId: number;

  @Column({ name: 'responsable_id' })
  responsableId: number;
}
