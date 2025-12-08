import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HospitalsModule } from './hospitals/hospitals.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { PlacesModule } from './places/places.module';
import { User } from './auth/user.entity';
import { Post } from './posts/post.entity';
import { Like } from './posts/like.entity';
import { Comment } from './posts/comment.entity';
import { Place } from './places/place.entity';
import { PronunciationModule } from './pronunciation/pronunciation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Post, Like, Comment, Place],
      synchronize: true, // Auto-create tables (dev only)
    }),
    HospitalsModule,
    AuthModule,
    PostsModule,
    PostsModule,
    PlacesModule,
    PronunciationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
