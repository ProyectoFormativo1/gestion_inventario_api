import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

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
      contrasena: hashedContrasena
    });

    return await this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
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

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const { contrasena } = updateUsuarioDto;
    if (contrasena) {
      updateUsuarioDto.contrasena = await bcrypt.hash(contrasena);
    }
    const usuario = await this.usuarioRepository.preload({
      id,
      ...updateUsuarioDto,
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
