import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Material } from './entities/materiale.entity';

@Injectable()
export class MaterialesReporteService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
  ) {}
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
