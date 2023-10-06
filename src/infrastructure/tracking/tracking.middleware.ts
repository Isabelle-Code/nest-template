import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export class TrackingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(TrackingMiddleware.name);

  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    this.logger.debug('Executing tracking headers interceptor...');

    const traceId = req.headers['x-trace-id'] as string;

    if (!traceId) {
      this.logger.warn('TraceId not found');
      req.headers['x-trace-id'] = crypto.randomUUID();
      res.setHeader('x-trace-id', req.headers['x-trace-id']);
    }

    return next();
  }
}
