import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ExpirationUtil } from 'src/utils/expiration.util';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async iniciarSesion(createLoginDto: LoginRequestDto): Promise<LoginResponseDto> {

    let usuario = await this.usuariosService.findByCorreo(createLoginDto.correo);
    if (!usuario) {
      throw new NotFoundException(`Correo o contraseña incorrectos`);
    }

    const isMatch = await bcrypt.compare(createLoginDto.contrasena, usuario.contrasena);
    if (!isMatch) {
      throw new NotFoundException(`Correo o contraseña incorrectos`);
    }

    const payload = { id: usuario.id, correo: usuario.correo };
    const token = this.jwtService.sign(payload);
    const expiresIn = ExpirationUtil.parse(
      this.configService.get<string>('JWT_ACCESS_EXPIRATION')
    )
    return { token, expiresIn };
  }
}
