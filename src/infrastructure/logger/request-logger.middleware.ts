import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestLoggerMiddleware.name);

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
