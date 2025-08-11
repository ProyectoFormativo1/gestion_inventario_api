import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  HttpCode, 
  HttpStatus 
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los usuarios' })
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}
