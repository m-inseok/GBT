import { Controller, Get } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';

@Controller('hospitals')
export class HospitalsController {
    constructor(private readonly hospitalsService: HospitalsService) { }

    @Get('near')
    getNearHospitals() {
        return this.hospitalsService.getNearHospitals();
    }
}
