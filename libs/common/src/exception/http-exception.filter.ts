import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { Catch } from '@nestjs/common/decorators';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse() as any;

    const errorMessage =
      typeof errorResponse === 'object' && errorResponse.message
        ? errorResponse.message
        : 'Internal Server Error';

    response.status(status).json({
      isSuccess: false,
      errorMessage,
    });
  }
}
