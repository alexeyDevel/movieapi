import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { hashPassword } from '../../auth/utils/auth.util';

@Injectable()
export class CreateUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { login, password } = request.body;
    if (!(login && password)) {
      throw new BadRequestException('Не все данные заполнены');
    }
    const passwordHash = hashPassword(password);
    request.body.passwordHash = passwordHash;
    return next.handle().pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
