import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CheckingAccount,
  CheckingAccountSchema,
} from './checking-account.model';
import { CheckingAccountService } from './checking-account.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: CheckingAccount.name,
        useFactory: () => {
          const schema = CheckingAccountSchema;
          return schema;
        },
      },
    ]),
  ],
  exports: [CheckingAccountService],
  providers: [CheckingAccountService],
})
export class CheckingAccountModule {}
