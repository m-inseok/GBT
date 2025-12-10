import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { Place } from './place.entity';
import { Review } from './review.entity';
import { User } from '../auth/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forFeature([Place, Review, User]),
        ConfigModule
    ],
    controllers: [PlacesController],
    providers: [PlacesService],
})
export class PlacesModule { }
