import { PartialType } from '@nestjs/swagger';
import { CreateCentroFormacionDto } from './create-centro-formacion.dto';

export class UpdateCentroFormacionDto extends PartialType(CreateCentroFormacionDto) {}
