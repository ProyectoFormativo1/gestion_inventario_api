import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';
import { UsuarioDto } from './dto/usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const hashedContrasena = await bcrypt.hash(createUsuarioDto.contrasena, 10);

    const usuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      contrasena: hashedContrasena,
      rol_id: createUsuarioDto.rolId,
    });

    return await this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<UsuarioDto[]> {
    const usuarios = await this.usuarioRepository.find({
      relations: ['cargo', 'rol'],
    });
    return usuarios.map((usuario) => {
      return {
        id: usuario.id,
        apellidos: usuario.apellidos,
        nombres: usuario.nombres,
        correo: usuario.correo,
        cargoId: usuario.cargoId,
        rolId: usuario.rol_id,
        fechaCreacion: usuario.fechacreacion.toISOString(),
        cargoNombre: usuario.cargo?.nombre,
        rolNombre: usuario.rol?.nombre,
      };
    });
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuario #${id} not found`);
    }
    return usuario;
  }

  async findByCorreo(correo: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { correo } });
    if (!usuario) {
      throw new NotFoundException(`Usuario #${correo} not found`);
    }
    return usuario;
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    const { contrasena } = updateUsuarioDto;
    if (contrasena) {
      updateUsuarioDto.contrasena = await bcrypt.hash(contrasena, 10);
    }
    const usuario = await this.usuarioRepository.preload({
      id,
      ...updateUsuarioDto,
      rol_id: updateUsuarioDto.rolId,
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario #${id} not found`);
    }
    return await this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usuarioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuario #${id} not found`);
    }
  }
}
