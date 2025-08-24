import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
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

  // Obtener estadísticas de materiales
  async getMaterialStats(): Promise<{ total: number; porcentajeCrecimiento: number }> {
    const total = await this.materialRepository.count();

    // Obtener fecha de inicio y fin del mes actual y anterior
    const now = new Date();
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Contar materiales creados en el mes actual y anterior
    const countCurrentMonth = await this.materialRepository.count({
      where: {
        fecha_creacion: Between(startOfCurrentMonth, now),
      },
    });

    const countLastMonth = await this.materialRepository.count({
      where: {
        fecha_creacion: Between(startOfLastMonth, endOfLastMonth),
      },
    });

    // Calcular porcentaje de crecimiento
    let porcentajeCrecimiento = 0;
    if (countLastMonth > 0) {
      porcentajeCrecimiento = ((countCurrentMonth - countLastMonth) / countLastMonth) * 100;
    } else if (countCurrentMonth > 0) {
      porcentajeCrecimiento = 100;
    }

    return { total, porcentajeCrecimiento };
  }

  async countReabastecimiento(): Promise<number> {
    const { LessThanOrEqual } = require('typeorm');
    return await this.materialRepository.count({
      where: {
        stok: LessThanOrEqual(2)
      }
    });
  }

  async findProximosAVencer(dias: number = 30): Promise<Array<{ id: number; nombre: string; fecha_vencimiento: string | null; bodegaNombre?: string; stok: number }>> {
    const now = new Date();
    const limite = new Date();
    limite.setDate(now.getDate() + dias);

    const materiales = await this.materialRepository.find({
      relations: ['bodega'],
      where: {
        fecha_vencimiento: Between(now, limite),
      },
    });

    return materiales.map(material => ({
      id: material.id,
      nombre: material.nombre,
      fecha_vencimiento: material?.fecha_vencimiento ? material.fecha_vencimiento.toISOString() : null,
      bodegaNombre: material.bodega?.nombre,
      stok: material.stok
    }));
  }
}
