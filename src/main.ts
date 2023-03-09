import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from "dotenv";
import { AppModule } from './app.module';

const GLOBAL_PREFIX = '/api'
dotenv.config({ path: __dirname + "/.env" });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setup(app);
  swaggerSetup(app);
  const port = process.env.port;
  const server = await app.listen(Number(port));
  Logger.log(`http://localhost:${port}`, "APP")
}

/**
 * Настройки сервера
 * @param app 
 */
async function setup(app: INestApplication) {

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(GLOBAL_PREFIX);
}

/**
 * Настройки Swagger
 * @param app 
 */
async function swaggerSetup(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("MINING POOL")
    .setDescription(
      `<div>POWERED BY<tr/>  <img style="class="img" width="15px" src="https://nav.btc.com/blockchain_navigator/tabinfo/base/browser/btc.com.jpg" alt="BTC.com"> BTC.COM `
    ).setVersion("")
    .build();
  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup(GLOBAL_PREFIX, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      defaultModelsExpandDepth: 0,
      defaultModelExpandDepth: 0,
      // docExpansion: 'none', // Развернуть ветви
    },
  });

}

bootstrap();
