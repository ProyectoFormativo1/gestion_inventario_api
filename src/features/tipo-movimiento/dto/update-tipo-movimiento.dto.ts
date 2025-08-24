import { PartialType } from '@nestjs/swagger';
import { CreateTipoMovimientoDto } from './create-tipo-movimiento.dto';

export class UpdateTipoMovimientoDto extends PartialType(CreateTipoMovimientoDto) {}
