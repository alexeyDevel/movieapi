import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const errorMessage =
      'Произошла ошибка подключения к базе данных. Пожалуйста, попробуйте позже.';

    response.status(status).json({
      statusCode: status,
      message: errorMessage,
    });
  }
}
