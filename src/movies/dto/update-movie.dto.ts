import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import * as Joi from 'joi';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  name: string;
  description: string;
  rating: number;
}
export const updateMovieSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  rating: Joi.number().integer().positive().max(10),
});
