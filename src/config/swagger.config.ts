import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { writeFileSync } from "fs";

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Gestion Inventario API')
    .setDescription('Gestion Inventario APIs')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'authorization', // Este nombre debe coincidir con el decorador @ApiBearerAuth() si lo usas
    )           
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // Exportar a un archivo JSON
  writeFileSync('./oas.json', JSON.stringify(document, null, 2));
  SwaggerModule.setup('api', app, document);
}