import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for cross-origin requests
  const GLOBAL_PREFIX = 'api';
  app.setGlobalPrefix(GLOBAL_PREFIX); // Set a global prefix for all routes
  await app.listen(3000);
  Logger.log(`🚀 Application is running on: http://localhost:3000/${GLOBAL_PREFIX}/people?page=1`);
}

bootstrap();
