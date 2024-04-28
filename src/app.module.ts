import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import mongoose from 'mongoose';
mongoose.set('debug', true);

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-example'),
    UsersModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
