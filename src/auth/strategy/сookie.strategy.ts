import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import * as process from 'process';
@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy, 'cookie') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) =>
          request?.cookies?.Authorization?.replace('access_token ', ''),
      ]),
      secretOrKey: process.env.JWT_SECRET,
    });

    console.log('constructor');
  }

  async validate(login: string, password: string): Promise<any> {
    const jwt = await this.authService.validateUser(login, password);
    if (!jwt) {
      throw new UnauthorizedException();
    }
    return jwt;
  }
}
