import { ApplicationLogger } from './app.logger';
import { Module } from '@nestjs/common';

@Module({
  providers: [ApplicationLogger],
})
export class LoggerModule {}
