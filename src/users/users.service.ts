import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserSettings } from '../schemas/userSettings.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private user: Model<User>,
    @InjectModel(UserSettings.name) private userSettings: Model<UserSettings>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    if (createUserDto.settings) {
      const settings = await new this.userSettings(
        createUserDto.settings,
      ).save();
      const newUser = new this.user({
        ...createUserDto,
        settings: settings.id,
      });
      return newUser.save();
    }
    const newUser = new this.user(createUserDto);
    return newUser.save();
  }

  getUsers() {
    return this.user.find().populate('settings');
  }

  getUserById(id: string) {
    return this.user.findById(id).populate(['settings', 'posts']);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.user.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  deleteUser(id: string) {
    return this.user.findByIdAndDelete(id, { new: true });
  }
}
