import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger.config';

/**
 * Inicializa la aplicación NestJS, configura el prefijo global de rutas y aplica validaciones globales.
 * 
 * - Establece el prefijo "api" para todas las rutas.
 * - Aplica un ValidationPipe global que filtra y rechaza propiedades no permitidas en los DTOs.
 * - Inicia el servidor en el puerto definido por la variable de entorno PORT o en el puerto 3000 por defecto.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api")
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )
  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
