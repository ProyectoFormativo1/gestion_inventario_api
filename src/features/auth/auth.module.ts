import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { JwtConfigModule } from 'src/config/jwt.config';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [UsuariosModule, JwtConfigModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard, JwtConfigModule],
})
export class AuthModule {}
