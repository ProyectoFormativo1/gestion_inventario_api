import { Material } from 'src/features/materiales/entities/materiale.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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

  // 👇 Relación con Material
  @OneToMany(() => Material, (material) => material.unidadMedida)
  materiales: Material[];
}
