import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn-dto.dto';
import { CookieStrategy } from './strategy/сookie.strategy';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(CookieStrategy)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Res() res: any) {
    const accessToken = await this.authService.validateUser(
      signInDto.login,
      signInDto.password,
    );
    const maxAge = 3600 * 1000; // 1 hour
    res.cookie('access_token', accessToken, { httpOnly: true, maxAge });
    res.json({ access_token: accessToken });
  }

  @UseGuards(AuthGuard('cookie'))
  @Post('logout')
  async logout(@Req() req: any, @Res() res: any) {
    res.clearCookie('access_token');
    res.status(200).send();
  }
}
