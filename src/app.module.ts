import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './infrastructure/config/app.config';
import DatabaseModule from './infrastructure/database/database.module';
import { HealthModule } from './infrastructure/health/health.module';
import databaseConfig from './infrastructure/config/database.config';
import { CheckingAccountRestModule } from './app/account/checking-account.rest-module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ResponseLoggerMiddleware } from './infrastructure/logger/response-logger.middleware';
import { RequestLoggerMiddleware } from './infrastructure/logger/request-logger.middleware';
import { RequestContextMiddleware } from './infrastructure/context/request-context.middleware';
import { ContextModule } from './infrastructure/context/context.module';
import { AlsModule } from './infrastructure/context/als.module';
import { TrackingMiddleware } from './infrastructure/tracking/tracking.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      load: [appConfig, databaseConfig],
    }),
    DatabaseModule,
    HealthModule,
    LoggerModule,
    CheckingAccountRestModule,
    AlsModule,
    ContextModule,
  ],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        TrackingMiddleware,
        RequestContextMiddleware,
        RequestLoggerMiddleware,
        ResponseLoggerMiddleware,
      )
      .forRoutes('*');
  }
}
