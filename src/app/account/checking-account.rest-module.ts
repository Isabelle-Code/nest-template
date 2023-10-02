import { Module } from '@nestjs/common';
import { CheckingAccountRestResource } from './checking-account.rest-resource';
import { CheckingAccountModule } from '../../domain/account/checking/checking-account.module';

@Module({
  controllers: [CheckingAccountRestResource],
  imports: [CheckingAccountModule],
})
export class CheckingAccountRestModule {}
