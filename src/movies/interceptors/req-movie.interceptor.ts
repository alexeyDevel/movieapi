import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as path from 'path';

export class ReqMovieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((item) => this.transformData(item));
        } else {
          return this.transformData(data);
        }
      }),
    );
  }

  private transformData(data: any): any {
    const formattedData = {
      _id: data._id,
      name: data.name,
      description: data.description,
      rating: data.rating,
      cover: data.cover
        ? path.join(__dirname, '../../../uploads', data.cover)
        : '',
    };
    return formattedData;
  }
}
