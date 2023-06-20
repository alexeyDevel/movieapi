import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto, createMovieSchema } from './dto/create-movie.dto';
import { UpdateMovieDto, updateMovieSchema } from './dto/update-movie.dto';
import { JoiValidationPipe } from './pipes/joi-validation.pipe';
import { FileInterceptor } from './interceptors/file.interceptor';
import { ReqMovieInterceptor } from './interceptors/req-movie.interceptor';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor, ReqMovieInterceptor)
  async create(
    @UploadedFile() file,
    @Body(new JoiValidationPipe(createMovieSchema))
    createMovieDto: CreateMovieDto,
  ) {
    const filename = file?.filename;
    if (filename) {
      createMovieDto.cover = filename;
    }
    return await this.moviesService.create(createMovieDto);
  }

  @Get()
  @UseInterceptors(ReqMovieInterceptor)
  async findAll(@Body() data) {
    const sortDirection =
      (data && data.sort === '1') || data.sort === '-1' ? data.sort : '';
    if (sortDirection) return this.moviesService.findAll(sortDirection);
    else {
      return this.moviesService.findAll();
    }
  }

  @Get(':id')
  @UseInterceptors(ReqMovieInterceptor)
  async findOne(@Param('id') id: string) {
    return await this.moviesService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor, ReqMovieInterceptor)
  async update(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(updateMovieSchema))
    updateMovieDto: UpdateMovieDto,
  ) {
    return await this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    return await this.moviesService.remove(id);
  }
}
