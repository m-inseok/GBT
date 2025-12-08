import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async checkEmail(email: string) {
        const user = await this.usersRepository.findOne({ where: { email } });
        return { available: !user };
    }

    async checkNickname(nickname: string) {
        const user = await this.usersRepository.findOne({ where: { nickname } });
        return { available: !user };
    }

    async signup(body: any) {
        const { email, nickname, password } = body;

        const existingUser = await this.usersRepository.findOne({ where: [{ email }, { nickname }] });
        if (existingUser) {
            throw new ConflictException('Email or Nickname already exists');
        }

        const user = this.usersRepository.create({ email, nickname, password });
        await this.usersRepository.save(user);
        return { success: true, message: 'User registered successfully' };
    }

    async login(body: any) {
        const { email, password } = body;
        console.log(`Attempting login for: ${email} with password: ${password}`);
        const user = await this.usersRepository.findOne({ where: { email, password } });
        console.log('User found:', user);

        if (!user) {
            console.log('Login failed: User not found or invalid password');
            throw new UnauthorizedException('Invalid credentials');
        }

        // Mock Access Token (In production, use JwtService with process.env.JWT_SECRET)
        const secret = process.env.JWT_SECRET || 'dev_secret_key';
        const accessToken = `mock_access_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`; // Still mock for now as we don't have full JWT setup

        return {
            accessToken,
            user: {
                email: user.email,
                nickname: user.nickname,
                isSubscribed: user.isSubscribed,
                location: user.location,
                introduction: user.introduction,
                latitude: user.latitude,
                longitude: user.longitude
            }
        };
    }

    async resetPassword(body: any) {
        const { email, currentPassword, newPassword } = body;
        const user = await this.usersRepository.findOne({ where: { email, password: currentPassword } });

        if (!user) {
            throw new UnauthorizedException('Invalid current password');
        }

        user.password = newPassword;
        await this.usersRepository.save(user);

        return { success: true, message: 'Password updated successfully' };
    }

    async toggleSubscription(body: any) {
        const { email } = body;
        const user = await this.usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        user.isSubscribed = !user.isSubscribed;
        await this.usersRepository.save(user);

        return {
            success: true,
            isSubscribed: user.isSubscribed,
            message: user.isSubscribed ? 'Subscribed successfully' : 'Unsubscribed successfully'
        };
    }

    async updateProfile(body: any) {
        const { email, nickname, location, introduction, latitude, longitude } = body;
        const user = await this.usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        if (nickname && nickname !== user.nickname) {
            const existingUser = await this.usersRepository.findOne({ where: { nickname } });
            if (existingUser) {
                throw new ConflictException('Nickname already exists');
            }
            user.nickname = nickname;
        }

        if (location !== undefined) user.location = location;
        if (introduction !== undefined) user.introduction = introduction;
        if (latitude !== undefined) user.latitude = latitude;
        if (longitude !== undefined) user.longitude = longitude;

        await this.usersRepository.save(user);

        return {
            success: true,
            message: 'Profile updated successfully',
            user: {
                email: user.email,
                nickname: user.nickname,
                isSubscribed: user.isSubscribed,
                location: user.location,
                introduction: user.introduction,
                latitude: user.latitude,
                longitude: user.longitude
            }
        };
    }
}
