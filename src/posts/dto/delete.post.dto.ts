import { PickType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create.post.dto';

export class DeletePostDto extends PickType(CreatePostDto, ['user'] as const) {}
