import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('check-email')
    checkEmail(@Query('email') email: string) {
        return this.authService.checkEmail(email);
    }

    @Get('check-nickname')
    checkNickname(@Query('nickname') nickname: string) {
        return this.authService.checkNickname(nickname);
    }

    @Post('signup')
    signup(@Body() body: any) {
        return this.authService.signup(body);
    }

    @Post('login')
    login(@Body() body: any) {
        return this.authService.login(body);
    }

    @Post('reset-password')
    resetPassword(@Body() body: any) {
        return this.authService.resetPassword(body);
    }

    @Post('subscription')
    toggleSubscription(@Body() body: any) {
        return this.authService.toggleSubscription(body);
    }

    @Post('profile')
    updateProfile(@Body() body: any) {
        return this.authService.updateProfile(body);
    }
}
