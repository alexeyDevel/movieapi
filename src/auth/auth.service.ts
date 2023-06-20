import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { hashPassword } from './utils/auth.util';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByLogin(login);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const hashPas = hashPassword(pass);
    if (user?.passwordHash && bcrypt.compareSync(user.passwordHash, hashPas)) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user._id, login: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async login(user: User) {
    const payload = { userId: user._id, login: user.login };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
