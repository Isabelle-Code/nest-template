import { Injectable, Logger } from '@nestjs/common';
import {
  CheckingAccount,
  CheckingAccountDocument,
} from './checking-account.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountDoesNotExists, AccountDuplicatedError } from '../account.error';

@Injectable()
export class CheckingAccountService {
  private readonly logger = new Logger(CheckingAccountService.name);

  constructor(
    @InjectModel(CheckingAccount.name)
    private readonly model: Model<CheckingAccount>,
  ) {}

  async createAccount(accNumber: string): Promise<CheckingAccount> {
    try {
      const doc: CheckingAccountDocument = await this.model.create({
        active: true,
        number: accNumber,
        balance: 0,
      });

      this.logger.log(`Account ${accNumber} created with _id ${doc._id}`);
      return doc as CheckingAccount;
    } catch (err) {
      this.logger.warn(`Account ${accNumber} already exists`);
      return Promise.reject(new AccountDuplicatedError(accNumber));
    }
  }

  async getAccount(accNumber: string): Promise<CheckingAccount> {
    return (await this.#findAccount(accNumber)) as CheckingAccount;
  }

  async deleteAccount(accNumber: string): Promise<void> {
    try {
      await this.model.findOneAndUpdate(
        {
          number: accNumber,
        },
        {
          active: false,
        },
      );
      this.logger.log(`Checking account ${accNumber} disabled`);
    } catch (error) {
      this.logger.warn(`Checking account ${accNumber} does not exists`);
      return Promise.reject();
    }
  }

  async #findAccount(accNumber: string): Promise<CheckingAccountDocument> {
    const acc: CheckingAccountDocument = await this.model.findOne({
      number: accNumber,
      active: true,
    });

    if (!acc) {
      this.logger.warn(`Checking account ${accNumber} does not exists`);
      return Promise.reject(new AccountDoesNotExists(accNumber));
    }

    return acc;
  }
}
