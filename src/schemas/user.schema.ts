import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserSettings } from './userSettings.schema';
import mongoose from 'mongoose';
import { Post } from './post.schema';

@Schema({
  toJSON: {
    virtuals: true,
  },
  virtuals: {
    posts: {
      options: {
        ref: Post.name,
        localField: '_id',
        foreignField: 'user',
        justOne: false,
      },
    },
  },
})
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: false })
  avatarUrl?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserSettings.name })
  settings?: UserSettings;
}

export const UserSchema = SchemaFactory.createForClass(User);
