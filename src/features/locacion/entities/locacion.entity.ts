import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TipoLocacion } from '../enum/tipo_locacion';
import { CentroFormacion } from 'src/features/centro-formacion/entities/centro-formacion.entity';
@Entity("locacion")
export class Locacion {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column({
    type: 'enum',
    enum: TipoLocacion,
  })
  tipo: TipoLocacion;
  @Column({ name:"codigo_postal"})
  codigoPostal: string;
  @Column({ name:"parent_id", nullable: true })
  parentId?: number;

  
  // 👇 Relación con CentroFormacion
  @OneToMany(() => CentroFormacion, (centro) => centro.locacion)
  centros: CentroFormacion[];
}
