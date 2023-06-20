import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      return await this.userModel.create(createUserDto);
    } catch (e) {
      if (e.code === 11000) {
        throw new BadRequestException(
          'Пользователь с таким логином уже существует',
        );
      }
      throw new BadRequestException('Ошибка при создании пользователя');
    }
  }
  async findOneByLogin(login: string): Promise<User> {
    const users = await this.userModel.findOne({ login }).exec();
    return users;
  }
}
