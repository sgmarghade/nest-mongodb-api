import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  private async findUser(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Not valid mongoose id', 400);
    }

    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user;
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.findUser(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.findUser(id);
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.findUser(id);
    return this.userService.deleteUser(id);
  }
}
