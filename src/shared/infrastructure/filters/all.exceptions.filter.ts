import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	Logger,
	BadRequestException,
	UnauthorizedException,
	RequestTimeoutException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { DomainError } from '../../domain/DomainError';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

	private readonly FrameworkErrorClasses = [BadRequestException, UnauthorizedException, RequestTimeoutException];

	catch(exception: unknown, host: ArgumentsHost): void {
		const { httpAdapter } = this.httpAdapterHost;

		const ctx = host.switchToHttp();

		let message = null;
		let httpStatus = null;

		this.FrameworkErrorClasses.forEach((DomainError) => {
			if (exception instanceof DomainError) {
				message = exception['response'].message;
				httpStatus = 400;
			}
		});

		if (exception instanceof DomainError) {
			message = exception.message;
			httpStatus = 400;
		}

		if (!message) {
			Logger.error(`AllExceptionsFilter: ${exception}`);
			message = 'Internal Server Error';
			httpStatus = 500;
		}

		const responseBody = {
			success: false,
			message,
		};

		httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
	}
}
