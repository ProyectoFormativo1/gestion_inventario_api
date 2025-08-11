import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TipoLocacion } from '../enum/tipo_locacion';
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
}
