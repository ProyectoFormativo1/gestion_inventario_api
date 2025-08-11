import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('unidad_medida')
export class UnidadMedida {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  simbolo: string;

  @Column()
  tipo: string;

  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
    default: () => `TIMEZONE('America/Bogota', NOW())`,
  })
  fecha_creacion: Date;

  @Column({ nullable: true })
  descripcion?: string;
}
