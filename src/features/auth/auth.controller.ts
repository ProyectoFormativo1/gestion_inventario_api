import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  login(@Body() createLoginDto: LoginRequestDto) {
    return this.authService.iniciarSesion(createLoginDto);
  }
}
