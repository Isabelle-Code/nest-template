import { Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import { format } from 'winston';
import { AsyncLocalStorage } from 'node:async_hooks';
import { Context } from '../context/context.model';
import { createConsoleMessage } from './message.logger';

@Injectable()
export class ApplicationLogger implements LoggerService {
  #instance: winston.Logger;

  constructor(
    private readonly configuration: ConfigService,
    private readonly als: AsyncLocalStorage<Context>,
  ) {
    this.#instance = winston.createLogger({
      level: configuration.get('app.logLevel'),
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
      ),
    });

    if (configuration.get('app.env') === 'local') {
      this.#instance.add(
        new winston.transports.Console({
          format: format.printf(createConsoleMessage),
        }),
      );
    } else {
      this.#instance.add(
        new winston.transports.Console({
          format: format.json(),
        }),
      );
    }
  }

  debug(message: any, ...optionalParams: any[]): any {
    this.#log('debug', message, optionalParams);
  }

  error(message: any, ...optionalParams: any[]): any {
    this.#log('error', message, optionalParams);
  }

  log(message: any, ...optionalParams: any[]): any {
    this.#log('info', message, optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]): any {
    this.#log('verbose', message, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]): any {
    this.#log('warn', message, optionalParams);
  }

  #log(level: string, message: any, ...optionalParams: any[]): any {
    this.#instance.log(level, message, this.#getMetadata(optionalParams));
  }

  #getMetadata(optionalParams: any): any {
    return { ...optionalParams, ...this.als?.getStore() };
  }
}
