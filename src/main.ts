import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './validation/validation.pipe';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('karandash')
    .setDescription('karandash')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: true
  });
  SwaggerModule.setup('/docs', app, document);

  await app.listen(PORT);
}
bootstrap();
