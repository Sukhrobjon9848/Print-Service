import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3001']
  })
  console.log(process.env.DB);
  
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
