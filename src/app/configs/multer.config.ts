import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig: MulterOptions = {
  storage: diskStorage({
    destination: './uploads', // Папка назначения для сохранения загруженных фотографий
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = extname(file.originalname);
      callback(null, `${uniqueSuffix}${extension}`); // Имя файла будет иметь уникальное имя с добавлением расширения
    },
  }),
};
