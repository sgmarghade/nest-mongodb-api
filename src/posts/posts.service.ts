import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../schemas/post.schema';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { CreatePostDto } from './dto/create.post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private post: Model<Post>,
    @InjectModel(User.name) private user: Model<User>,
  ) {}

  async createPost(userId: string, createPostDto: CreatePostDto) {
    const user = await this.user.findById(userId);
    if (!user) {
      throw new HttpException('User not found ', 404);
    }

    return new this.post(createPostDto).save();
  }

  async deletePost(userId: string, postId: string) {
    const user = await this.user.findById(userId);
    if (!user) {
      throw new HttpException('User not found ', 404);
    }

    const post = await this.post.findById(postId);
    if (!post) {
      throw new HttpException('Post not found', 404);
    }

    if (post.user.toString() !== userId) {
      throw new HttpException("Post doesn't belong to user", 401);
    }

    return this.post.findByIdAndDelete(postId);
  }
}
