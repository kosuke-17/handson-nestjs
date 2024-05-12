import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { writeFile } from 'fs/promises';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';

// applicationの作成
export const createApp = async () => {
  // 第二引数に{logger : false}を記述するとnestjsの標準出力されるログが非表示になる
  const app: INestApplication = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useLogger(await app.resolve(LoggerService));

  const document: OpenAPIObject = createSwagger(app);
  SwaggerModule.setup('api/swagger', app, document);
  app.enableCors();

  return app;
};

// swaggerの作成
export const createSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder().setTitle('API仕様書').build();

  const apiDocument: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, apiDocument);
  return apiDocument;
};

async function bootstrap() {
  const app: INestApplication = await createApp();
  const document = createSwagger(app);

  await writeFile('./swagger.json', JSON.stringify(document, null, '  '));

  await app.listen(3031);
}
bootstrap();
