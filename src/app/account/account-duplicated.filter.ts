import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { AccountDuplicatedError } from '../../domain/account/account.error';
import { ResponseErrorDTO } from '../response.dto';
import { FastifyReply } from 'fastify';

@Catch(AccountDuplicatedError)
export class AccountDuplicatedFilter implements ExceptionFilter {
  catch(exception: AccountDuplicatedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: FastifyReply = ctx.getResponse();
    response.send({
      statusCode: 409,
      message: exception.message,
    } as ResponseErrorDTO);
  }
}
