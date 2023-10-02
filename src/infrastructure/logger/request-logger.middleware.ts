import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestLoggerMiddleware.name);

  constructor(private readonly configuration: ConfigService) {}

  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    const msg = `${req.method}::${req.url}`;

    // if (this.configuration.get('app.logLevel') === 'debug') {
    //   msg += `\nHeader[ ${JSON.stringify(req.headers)} ]`;
    //   msg += `\nBody[${JSON.stringify(req.body)}]`;
    // }

    this.logger.log(msg);
    if (next) {
      next();
    }
  }
}
