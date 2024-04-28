import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Post {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
