import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: 'Iniciar sesión' })
  @HttpCode(HttpStatus.OK)
  login(@Body() createLoginDto: LoginRequestDto) {
    return this.authService.iniciarSesion(createLoginDto);
  }
}
