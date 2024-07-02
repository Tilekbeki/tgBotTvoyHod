import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';


async function bootstrap() {
  // const app = await NestFactory.create(AppModule);

  const app = await NestFactory.create(AppModule, new ExpressAdapter());
  // Настройка пути к папке со статическими файлами
  app.use('/static', express.static('public'));
  app.enableCors({
    origin: 'http://localhost:3001', // Разрешить запросы только с этого домена
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Разрешить передачу куки и аутентификационных заголовков
  });

  await app.listen(3000);
}
bootstrap();
