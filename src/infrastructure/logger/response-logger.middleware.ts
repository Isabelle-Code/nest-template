import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export class ResponseLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ResponseLoggerMiddleware.name);

  constructor() {}

  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    const { method, url } = req;

    res.on('close', () => {
      const { statusCode } = res;

      this.logger.log(`(${statusCode})::${method}:${url}`);
    });
    next();
  }
}
