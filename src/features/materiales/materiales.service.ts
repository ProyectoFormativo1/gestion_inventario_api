import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './entities/materiale.entity';
import { CreateMaterialDto} from './dto/create-materiale.dto';
import { UpdateMaterialeDto} from './dto/update-materiale.dto';

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

  async findAll(): Promise<Material[]> {
    return await this.materialRepository.find();
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
