import { Controller, Get, Query } from '@nestjs/common';
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
}
