import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AsyncLocalStorage } from 'node:async_hooks';
import { Context } from './context.model';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(private readonly als: AsyncLocalStorage<Context>) {}

  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    const store: Context = {
      terminal: req.headers['x-terminal'] as string,
      traceId: req.headers['x-trace-id'] as string,
    };
    this.als.run(store, () => {
      if (next) {
        next();
      }
    });
  }
}
