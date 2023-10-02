import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';
import { CheckingAccountService } from '../../domain/account/checking/checking-account.service';
import { AccountDuplicatedFilter } from './account-duplicated.filter';
import { CheckingAccountDTO } from './checking-account.dto';
import { CheckingAccount } from '../../domain/account/checking/checking-account.model';
import { AccountNotFoundFilter } from './account-not-found.filter';

@Controller('accounts/checking')
export class CheckingAccountRestResource {
  private readonly logger = new Logger(CheckingAccountRestResource.name);

  constructor(private readonly service: CheckingAccountService) {}

  @Post(':accNumber')
  @HttpCode(204)
  @UseFilters(AccountDuplicatedFilter)
  async createCheckingAccount(
    @Param('accNumber') accNumber: string,
  ): Promise<void> {
    this.logger.debug(`Creating checking account ${accNumber}`);
    await this.service.createAccount(accNumber);
    this.logger.debug(`Checking account ${accNumber} created`);
  }

  @Get(':accNumber')
  @UseFilters(AccountNotFoundFilter)
  async getCheckingAccount(
    @Param('accNumber') accNumber: string,
  ): Promise<CheckingAccountDTO> {
    this.logger.debug(`Trying to find checking account ${accNumber}`);
    const result = await this.service.getAccount(accNumber);
    this.logger.debug(`Checking account ${accNumber} retrieved`);
    return this.#mapToDTO(result);
  }

  @Delete(':accNumber')
  @HttpCode(204)
  @UseFilters(AccountNotFoundFilter)
  async deleteCheckingAccount(
    @Param('accNumber') accNumber: string,
  ): Promise<void> {
    this.logger.debug(`Trying to delete checking account ${accNumber}`);
    await this.service.deleteAccount(accNumber);
    this.logger.debug(`Checking account ${accNumber} deleted`);
  }

  #mapToDTO(checkingAccount: CheckingAccount): CheckingAccountDTO {
    return {
      number: checkingAccount.number,
      balance: checkingAccount.balance,
    };
  }
}
