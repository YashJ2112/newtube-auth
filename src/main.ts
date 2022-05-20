import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
  app.enableCors();
  await app.listen(5000);
=======
  await app.listen(3000);
>>>>>>> 72bc1b81a6ccaab2c26bb350b42f048498eaf762
}
bootstrap();
