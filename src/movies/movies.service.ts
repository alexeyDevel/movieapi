import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './schemas/movies.schema';
import { IMovie } from './interfaces/IMovie';
import * as path from 'path';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}
  async create(createMovieDto: CreateMovieDto): Promise<IMovie> {
    const movie = await this.movieModel.create(createMovieDto);
    return movie;
  }

  async findAll(sortOption = null): Promise<Movie[]> {
    try {
      const movies = await this.movieModel
        .find()
        .select('-__v')
        .sort(sortOption ? { rating: sortOption } : null)
        .exec();

      return movies;
    } catch (e) {}
    throw new InternalServerErrorException('Проблема с сортировкой фильмов');
  }

  async findOne(id: string): Promise<IMovie> {
    try {
      const movie = await this.movieModel.findById(id).select('-__v').exec();
      return movie;
    } catch (e) {
      throw new NotFoundException('Фильм не найден');
    }
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<IMovie> {
    try {
      const res = await this.movieModel
        .findByIdAndUpdate(id, updateMovieDto)
        .exec();
      return await this.movieModel.findById(res._id).exec();
    } catch (e) {
      throw new NotFoundException('Фильм не найден');
    }
  }

  async remove(id: string): Promise<IMovie> {
    try {
      return this.movieModel.findByIdAndRemove(id).exec();
    } catch (e) {
      throw new NotFoundException('Фильм не найден');
    }
  }
}
