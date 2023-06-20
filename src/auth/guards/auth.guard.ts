import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as process from 'process';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    console.log('token');
    try {
      const token = request.cookies['access_token'];
      console.log(token);
      const payload = await this.jwtService.verifyAsync(token.access_token, {
        secret: process.env.JWT_SECRET,
      });
      request['user'] = payload;
      request['userId'] = payload._id;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
