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
import { Review } from './places/review.entity';
import { PronunciationModule } from './pronunciation/pronunciation.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_FILE || 'db.sqlite',
      entities: [User, Post, Like, Comment, Place, Review],
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
