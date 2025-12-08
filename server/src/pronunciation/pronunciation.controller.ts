import { Body, Controller, Post } from '@nestjs/common';
import { PronunciationService } from './pronunciation.service';

@Controller('pronunciation')
export class PronunciationController {
    constructor(private readonly pronunciationService: PronunciationService) { }

    @Post('analyze')
    analyze(@Body() body: { userText: string; targetText: string }) {
        return this.pronunciationService.analyze(body.userText, body.targetText);
    }
}
