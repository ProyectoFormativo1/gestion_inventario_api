import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './entities/materiale.entity';
import { CreateMaterialDto} from './dto/create-materiale.dto';
import { UpdateMaterialeDto} from './dto/update-materiale.dto';
import { MaterialDto } from './dto/material.dto';

@Injectable()
export class MaterialesService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
  ) {}

  async create(createMaterialDto: CreateMaterialDto): Promise<Material> {
    const material = this.materialRepository.create({
      ...createMaterialDto,
    });
    return await this.materialRepository.save(material);
  }

  async findAll(): Promise<MaterialDto[]> {
    const result = await this.materialRepository.find({
      relations: ['bodega', 'unidadMedida'],
    });
    return result.map(material => {
      return {
        id: material.id,
        nombre: material.nombre,
        bodegaNombre: material.bodega?.nombre,
        unidadMedidaNombre: material.unidadMedida?.nombre,
        bodega_id: material.bodega_id,
        unidad_medida_id: material.unidad_medida_id,
        codigo_sena: material.codigo_sena,
        codigo_unspsc: material.codigo_unspsc,
        tipo: material.tipo,
        numero_contrato: material.numero_contrato,
        stok: material.stok,
        fecha_vencimiento: material?.fecha_vencimiento?.toISOString(),
        fecha_vigencia: material?.fecha_vigencia?.toISOString(),
        fecha_creacion: material?.fecha_creacion?.toISOString(),
        fecha_actualizacion: material?.fecha_actualizacion?.toISOString(),
      }
    });
  }

  async findAllByBodegaId(bodegaId: number): Promise<MaterialDto[]> {
    const result = await this.materialRepository.find({
      relations: ['bodega', 'unidadMedida'],
      where: { bodega_id: bodegaId },
    });
    return result.map(material => {
      return {
        id: material.id,
        nombre: material.nombre,
        bodegaNombre: material.bodega?.nombre,
        unidadMedidaNombre: material.unidadMedida?.nombre,
        bodega_id: material.bodega_id,
        unidad_medida_id: material.unidad_medida_id,
        codigo_sena: material.codigo_sena,
        codigo_unspsc: material.codigo_unspsc,
        tipo: material.tipo,
        numero_contrato: material.numero_contrato,
        stok: material.stok,
        fecha_vencimiento: material?.fecha_vencimiento?.toISOString(),
        fecha_vigencia: material?.fecha_vigencia?.toISOString(),
        fecha_creacion: material?.fecha_creacion?.toISOString(),
        fecha_actualizacion: material?.fecha_actualizacion?.toISOString(),
      }
    });

  }

  async findOne(id: number): Promise<Material> {
    const material = await this.materialRepository.findOne({ where: { id } });
    if (!material) {
      throw new NotFoundException(`Material #${id} no encontrado`);
    }
    return material;
  }

  async update(id: number, updateMaterialDto: UpdateMaterialeDto):Promise<Material> {
    const material = await this.materialRepository.preload({
      id,
      ...updateMaterialDto,
    });
    if (!material) {
      throw new NotFoundException(`Material #${id} no encontrado`);
    }
    return await this.materialRepository.save(material);
  }

  async remove(id: number): Promise<void> {
    const result = await this.materialRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Material #${id} no encontrado`);
    }
  }
}
