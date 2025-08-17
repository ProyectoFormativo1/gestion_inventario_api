// src/config/jwt-config.module.ts
import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<JwtModuleOptions> => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_EXPIRATION'),
          audience: configService.get<string>('JWT_AUDIENCE'),
          issuer: configService.get<string>('JWT_ISSUER'),
          algorithm: 'HS256',
        },
      }),
    }),
  ],
  exports: [JwtModule], // 🔑 Exportamos para que otros módulos puedan usarlo
})
export class JwtConfigModule {}
