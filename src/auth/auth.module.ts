import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CookieStrategy } from './strategy/сookie.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [AuthService, CookieStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
