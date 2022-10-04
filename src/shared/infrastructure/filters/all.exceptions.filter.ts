import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { DomainError } from '../../domain/DomainError';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    console.log('[ERROR]: ', exception);
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const isDomainErrorInstance = exception instanceof DomainError;

    const httpStatus = isDomainErrorInstance
      ? 400
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = isDomainErrorInstance
      ? exception.message
      : 'Internal server error';

    const responseBody = {
      success: false,
      message: message,
    };

    const logObject = {
      error: exception,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      timestamp: new Date().toISOString(),
    };

    console.log(logObject);

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
