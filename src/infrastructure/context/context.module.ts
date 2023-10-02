import { Module } from '@nestjs/common';
import { RequestContextMiddleware } from './request-context.middleware';

@Module({
  providers: [RequestContextMiddleware],
})
export class ContextModule {}
