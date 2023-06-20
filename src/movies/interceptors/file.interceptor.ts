import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import * as multer from 'multer';

@Injectable()
export class FileInterceptor implements NestInterceptor {
  private upload;

  constructor() {
    this.upload = multer({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename: string = uuidv4() + extname(file.originalname);
          cb(null, filename);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024, // Максимальный размер файла в байтах (5 МБ)
      },
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new BadRequestException('Invalid file format'));
        }
        cb(null, true);
      },
    });
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    await new Promise<void>((resolve, reject) => {
      this.upload.single('file')(request, response, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    const fileInterceptorData = request.file; // Получение информации о загруженном файле

    request.fileInterceptorData = fileInterceptorData; // Сохранение информации о файле в request

    return next.handle();
  }
}
