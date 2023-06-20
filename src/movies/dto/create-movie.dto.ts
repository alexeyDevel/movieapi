import { IMovie } from '../interfaces/IMovie';
import * as Joi from 'joi';

export class CreateMovieDto implements IMovie {
  name: string;
  description: string;
  rating: number;
  cover: string;
}
export const createMovieSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  rating: Joi.number().integer().positive().max(10),
});
