import { PartialType } from '@nestjs/swagger';
import { CreateMaterialDto } from './create-materiale.dto';

export class UpdateMaterialeDto extends PartialType(CreateMaterialDto) {}
