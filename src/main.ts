import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const corsConfig = {
  //   origin: ['http://example.com', 'https://my-website.com'], // Allow these domains
  //   methods: 'GET,POST,PUT,DELETE', // Specify allowed methods
  //   allowedHeaders: 'Content-Type, Authorization', // Specify allowed headers
  // }
  app.enableCors(); // corsConfig woulg be passed here
  app.setGlobalPrefix('api')
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
