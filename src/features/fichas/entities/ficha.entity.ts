import { Ambiente } from 'src/features/ambientes/entities/ambiente.entity';
import { Area } from 'src/features/areas/entities/area.entity';
import { Programa } from 'src/features/programas/entities/programa.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('fichas')
export class Ficha {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigo: string;

  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
    default: () => ` TIMEZONE('America/Bogota', NOW())`,
  })
  fechaCreacion: Date;

  @Column({ name: 'programa_id' })
  programaId: number;

  @Column({ name: 'area_id' })
  areaId: number;

  @Column({ name: 'ambiente_id' })
  ambienteId: number;

  // 👇 Relación con Programa
  @ManyToOne(() => Programa, (programa) => programa.fichas)
  @JoinColumn({ name: 'programa_id' }) // une con la FK
  programa: Programa;

  // 👇 Relación con Area
  @ManyToOne(() => Area, (area) => area.fichas)
  @JoinColumn({ name: 'area_id' }) // une con la FK
  area: Area;

    // 👇 Relación con Area
  @ManyToOne(() => Ambiente, (ambiente) => ambiente.fichas)
  @JoinColumn({ name: 'ambiente_id' }) // une con la FK
  ambiente: Ambiente;
}
