import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create.post.dto';
import { DeletePostDto } from './dto/delete.post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto.user, createPostDto);
  }

  @Delete(':id')
  deletePost(
    @Body() deletePostDto: DeletePostDto,
    @Param('id') postId: string,
  ) {
    return this.postService.deletePost(deletePostDto.user, postId);
  }
}
