import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { User } from '../auth/user.entity';

import { Like } from './like.entity';
import { Comment } from './comment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Post, User, Like, Comment])],
    controllers: [PostsController],
    providers: [PostsService],
})
export class PostsModule { }
