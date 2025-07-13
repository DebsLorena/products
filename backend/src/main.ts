import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';
import { AppModule } from './app.modules';


async function bootstrap() {
   const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const uploadPath = path.join(process.cwd(), 'uploads', 'products');
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
  
  app.useStaticAssets(path.join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  const config = new DocumentBuilder()
    .setTitle('API de Produtos e Pedidos')
    .setDescription('API para gerenciamento de produtos e pedidos')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('produtos')
    .addTag('pedidos')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log(`🚀 Aplicação rodando em: http://localhost:${port}`);
  console.log(`📚 Documentação disponível em: http://localhost:${port}/api/docs`);
}

bootstrap();