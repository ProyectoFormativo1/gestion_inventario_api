import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateSedeDto {
   @ApiProperty({
        description: 'Nombre de la sede',
        example: 'Yamboro',
    })
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'centro de formación al que pertenece la sede',
    example: 1,
  })
  @IsNumber()
  centroFormacionId: number;
}





