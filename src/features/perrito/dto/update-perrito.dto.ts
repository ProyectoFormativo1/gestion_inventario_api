import { PartialType } from '@nestjs/swagger';
import { CreatePerritoDto } from './create-perrito.dto';

export class UpdatePerritoDto extends PartialType(CreatePerritoDto) {}
