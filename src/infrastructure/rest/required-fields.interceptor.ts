import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { isNumber } from 'class-validator';

@Injectable()
export class RequiredFieldsInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RequiredFieldsInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    this.logger.debug('Executing required fields interceptor...');

    const req = context.switchToHttp().getRequest();
    const terminal = req.headers['x-terminal'];
    const path = req.originalUrl;

    if (!path.includes('health') && (!terminal || isNumber(terminal))) {
      this.logger.warn('Terminal not found');
      throw new BadRequestException('Header x-terminal not found');
    }

    return next.handle();
  }
}
