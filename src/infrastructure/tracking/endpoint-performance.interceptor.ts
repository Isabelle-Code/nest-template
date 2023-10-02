import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class EndpointPerformanceInterceptor implements NestInterceptor {
  private readonly logger = new Logger(EndpointPerformanceInterceptor.name);

  intercept(ctx: ExecutionContext, next: CallHandler<any>): Observable<any> {
    this.logger.debug('Executing endpoint performance interceptor...');
    const begin = Date.now();
    const url = ctx.switchToHttp().getRequest().originalUrl;

    return next.handle().pipe(
      finalize(() => {
        const end = Date.now();
        const duration = end - begin;
        this.logger.log(`Endpoint ${url} took ${duration}ms to execute`);
      }),
    );
  }
}
