import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlaceCategory } from './place.entity';

@Controller('places')
export class PlacesController {
    constructor(private readonly placesService: PlacesService) { }

    @Get('near')
    async getNearPlaces(
        @Query('lat') lat: number,
        @Query('lng') lng: number,
        @Query('category') category?: PlaceCategory,
        @Query('radius') radius?: number
    ) {
        return this.placesService.findAllNear(Number(lat), Number(lng), category, radius ? Number(radius) : 10);
    }

    @Get(':id')
    getPlace(@Param('id') id: number) {
        return this.placesService.findOne(id);
    }

    @Post(':id/reviews')
    createReview(
        @Param('id') id: number,
        @Body('email') email: string,
        @Body('content') content: string,
        @Body('rating') rating: number
    ) {
        return this.placesService.createReview(id, email, content, rating);
    }

    @Get(':id/reviews')
    getReviews(@Param('id') id: number) {
        return this.placesService.getReviews(id);
    }

    @Get(':id/summary')
    getReviewSummary(@Param('id') id: number) {
        return this.placesService.getReviewSummary(id);
    }
}
