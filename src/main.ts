import { TripsModule } from './trips/trips.module';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppConfig, SwaggerConfig } from './app.types';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsersModule } from './users/users.module';
import * as Config from 'config';
import fastifyMultipart from 'fastify-multipart';

async function bootstrap(config: AppConfig, swaggerConfig: SwaggerConfig) {
  const adapter = new FastifyAdapter({
    logger: true,
  });

  adapter.register(fastifyMultipart, {
    limits: {
      fieldNameSize: 1000,
      fieldSize: 20971520,
      fields: 10,
      fileSize: 100,
      files: 1,
      headerPairs: 2000,
    },
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );

  await app.enableCors({ origin: config.cors });

  await app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addTag(swaggerConfig.tag)
    .build();

  const usersDocument = SwaggerModule.createDocument(app, options, {
    include: [UsersModule, TripsModule],
  });

  SwaggerModule.setup(swaggerConfig.path, app, usersDocument);

  await app.listen(config.port, config.host);
  Logger.log(
    `Application served at http://${config.host}:${config.port}`,
    'bootstrap',
  );
}
bootstrap(
  Config.get<AppConfig>('server'),
  Config.get<SwaggerConfig>('swagger'),
);
