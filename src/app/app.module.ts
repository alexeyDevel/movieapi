import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { UsersModule } from '../users/users.module';
import { MoviesModule } from '../movies/movies.module';
import { multerConfig } from './configs/multer.config';
import { MulterModule } from '@nestjs/platform-express';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { DatabaseExceptionFilter } from './filters/databaseException.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    MulterModule.register(multerConfig),
    ConfigModule.forRoot({
      envFilePath: '.env-example.env',
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60000s' },
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule,
    MoviesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: DatabaseExceptionFilter,
    },
  ],
})
export class AppModule {}
