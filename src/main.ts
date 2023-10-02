import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { EndpointPerformanceInterceptor } from './infrastructure/tracking/endpoint-performance.interceptor';
import { RequiredFieldsInterceptor } from './infrastructure/rest/required-fields.interceptor';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ApplicationLogger } from './infrastructure/logger/app.logger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({}),
    {
      bufferLogs: true,
    },
  );

  app.useLogger(app.get(ApplicationLogger));

  const configService = app.get(ConfigService);
  const port = configService.get('app.port');
  const env = configService.get('app.env');
  const logLevel = configService.get('app.logLevel');

  Logger.log(`Using application profile ${env}`, 'NestApplication');
  Logger.log(`Using log level ${logLevel}`, 'NestApplication');

  app.useGlobalInterceptors(new EndpointPerformanceInterceptor());
  app.useGlobalInterceptors(new RequiredFieldsInterceptor());

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, '0.0.0.0');
  Logger.log(`Application listening on port ${port}`, 'NestApplication');
}

bootstrap();
