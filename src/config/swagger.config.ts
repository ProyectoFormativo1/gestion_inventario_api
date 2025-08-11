import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { writeFileSync } from "fs";

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Beep Auth')
    .setDescription('Beep Auth APIs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // Exportar a un archivo JSON
  writeFileSync('./oas.json', JSON.stringify(document, null, 2));
  SwaggerModule.setup('api', app, document);
}