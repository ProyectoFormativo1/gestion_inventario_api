import { IsDateString, IsNumber,  } from "class-validator";
export class CreateRolPermisoDto {
    @IsNumber()
    rolId: number;

    @IsNumber()
    permisoId: number;
}
