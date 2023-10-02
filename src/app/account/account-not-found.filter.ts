import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { AccountDoesNotExists } from '../../domain/account/account.error';
import { ResponseErrorDTO } from '../response.dto';

@Catch(AccountDoesNotExists)
export class AccountNotFoundFilter implements ExceptionFilter {
  catch(exception: AccountDoesNotExists, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.send({
      statusCode: 400,
      message: exception.message,
    } as ResponseErrorDTO);
  }
}
