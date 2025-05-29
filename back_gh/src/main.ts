import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    methods: 'GET,POST,PUT,PATCH,DELETE',
    allowedHeaers: 'Content-Type, Authotization',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const port = process.env.PORT || 3001;

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
void bootstrap();
