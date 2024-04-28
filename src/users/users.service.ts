import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private user: Model<User>) {}

  createUser(createUserDto: CreateUserDto) {
    const newUser = new this.user(createUserDto);
    return newUser.save();
  }

  getUsers() {
    return this.user.find();
  }

  getUserById(id: string) {
    return this.user.findById(id);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.user.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  deleteUser(id: string) {
    return this.user.findByIdAndDelete(id, { new: true });
  }
}
