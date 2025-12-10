import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place, PlaceCategory } from './place.entity';
import { Review } from './review.entity';
import { User } from '../auth/user.entity';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class PlacesService implements OnModuleInit {
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor(
        @InjectRepository(Place)
        private placesRepository: Repository<Place>,
        @InjectRepository(Review)
        private reviewsRepository: Repository<Review>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private configService: ConfigService
    ) {
        const apiKey = this.configService.get<string>('GEMINI_API_KEY');
        if (apiKey) {
            this.genAI = new GoogleGenerativeAI(apiKey);
            this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
        }
    }

    async onModuleInit() {
        // Force re-seed for development to include new test data
        await this.seedPlaces();
    }

    async seedPlaces() {
        await this.reviewsRepository.clear(); // Clear reviews first to avoid foreign key constraints
        await this.placesRepository.clear(); // Clear existing data to avoid duplicates

        const places = [
            // User's Location Area (37.3323, 127.2651)
            {
                name: '용인 처인구 보건소',
                category: PlaceCategory.MEDICAL,
                latitude: 37.3333,
                longitude: 127.2661,
                address: '경기도 용인시 처인구',
                tags: ['보건소', '예방접종'],
                image: '/place_images/Yongin Cheoin-gu Health Center.jpg',
                rating: 4.5,
                reviewCount: 50,
                status: '영업중',
                closingTime: '18:00'
            },
            {
                name: '용인 세브란스 병원',
                category: PlaceCategory.MEDICAL,
                latitude: 37.3313,
                longitude: 127.2641,
                address: '경기도 용인시 처인구',
                tags: ['종합병원', '응급실'],
                image: '/place_images/Yongin Severance Hospital.jpg',
                rating: 4.8,
                reviewCount: 200,
                status: '영업중',
                closingTime: '24:00'
            },
            {
                name: 'KB국민은행 용인대로점',
                category: PlaceCategory.FINANCIAL,
                latitude: 37.3343,
                longitude: 127.2671,
                address: '경기도 용인시 처인구',
                tags: ['ATM', '대출상담'],
                image: '/place_images/KB Kookmin Bank Yongin.jpg',
                rating: 4.2,
                reviewCount: 30,
                status: '영업중',
                closingTime: '16:00'
            },
            {
                name: '우리은행 처인구청점',
                category: PlaceCategory.FINANCIAL,
                latitude: 37.3303,
                longitude: 127.2631,
                address: '경기도 용인시 처인구',
                tags: ['환전', '자산관리'],
                image: '/place_images/Woori Bank Cheoin-gu Office.jpg',
                rating: 4.0,
                reviewCount: 25,
                status: '영업중',
                closingTime: '16:00'
            },
            {
                name: '역북 신원아침도시',
                category: PlaceCategory.RESIDENTIAL,
                latitude: 37.3328,
                longitude: 127.2656,
                address: '경기도 용인시 처인구',
                tags: ['아파트', '신축'],
                image: '/place_images/Yeokbuk Sinwon Morning Cityjpg.jpg',
                rating: 4.7,
                reviewCount: 10,
                status: '영업중',
                closingTime: '22:00'
            },
            {
                name: '용인 명지대역 코오롱하늘채',
                category: PlaceCategory.RESIDENTIAL,
                latitude: 37.3318,
                longitude: 127.2646,
                address: '경기도 용인시 처인구',
                tags: ['아파트', '역세권'],
                image: '/place_images/Yongin Myongji Univ. Station Kolon Haneulchae.jpg',
                rating: 4.6,
                reviewCount: 15,
                status: '영업중',
                closingTime: '22:00'
            },
            // Daejeon (Center approx: 36.3504, 127.3845)
            {
                name: '의료법인 영훈의료재단 대전선병원',
                category: PlaceCategory.MEDICAL,
                latitude: 36.3333,
                longitude: 127.4025,
                address: '대전 중구',
                tags: ['외국인 친화적', '영어 가능', '민생회복소비쿠폰'],
                image: 'https://via.placeholder.com/300x150',
                rating: 5.0,
                reviewCount: 145,
                status: '영업중',
                closingTime: '22:00'
            },
            {
                name: '대전성모병원',
                category: PlaceCategory.MEDICAL,
                latitude: 36.3256,
                longitude: 127.4211,
                address: '대전 중구 대흥동',
                tags: ['응급실', '종합병원', '주차가능'],
                image: 'https://via.placeholder.com/300x150',
                rating: 4.8,
                reviewCount: 320,
                status: '영업중',
                closingTime: '24:00'
            },
            {
                name: '삼성동새마을금고 본점',
                category: PlaceCategory.FINANCIAL,
                latitude: 36.3456,
                longitude: 127.4300,
                address: '대전 동구 삼성동',
                tags: ['외국인 친화적', '영어 가능', '주차가능'],
                image: 'https://via.placeholder.com/300x150',
                rating: 5.0,
                reviewCount: 145,
                status: '영업중',
                closingTime: '16:00'
            },
            {
                name: 'GS한밭자이아파트',
                category: PlaceCategory.RESIDENTIAL,
                latitude: 36.3400,
                longitude: 127.4350,
                address: '대전 동구 삼성동',
                tags: ['외국인 친화적', '저렴한 월세', '외국인 다수거주'],
                image: 'https://via.placeholder.com/300x150',
                rating: 5.0,
                reviewCount: 145,
                status: '영업중',
                closingTime: '22:00'
            },
            // Seoul (Center approx: 37.5665, 126.9780)
            {
                name: '서울대학교병원',
                category: PlaceCategory.MEDICAL,
                latitude: 37.5796,
                longitude: 126.9990,
                address: '서울 종로구',
                tags: ['대학병원', '외국인 진료소'],
                image: 'https://via.placeholder.com/300x150',
                rating: 4.8,
                reviewCount: 120,
                status: '영업중',
                closingTime: '18:00'
            },
            {
                name: '우리은행 본점',
                category: PlaceCategory.FINANCIAL,
                latitude: 37.5600,
                longitude: 126.9800,
                address: '서울 중구',
                tags: ['환전 가능', 'ATM'],
                image: 'https://via.placeholder.com/300x150',
                rating: 4.5,
                reviewCount: 80,
                status: '영업중',
                closingTime: '16:00'
            },
            // Busan (Center approx: 35.1796, 129.0756)
            {
                name: '부산대학교병원',
                category: PlaceCategory.MEDICAL,
                latitude: 35.1000,
                longitude: 129.0200,
                address: '부산 서구',
                tags: ['대학병원', '응급실'],
                image: 'https://via.placeholder.com/300x150',
                rating: 4.7,
                reviewCount: 90,
                status: '영업중',
                closingTime: '24:00'
            },
            // HUFS Seoul Campus (Center approx: 37.5973, 127.0588)
            {
                name: '한국외대 글로벌홀 기숙사',
                category: PlaceCategory.RESIDENTIAL,
                latitude: 37.5970,
                longitude: 127.0590,
                address: '서울 동대문구 이문동',
                tags: ['기숙사', '학생전용'],
                image: 'https://via.placeholder.com/300x150',
                rating: 4.5,
                reviewCount: 50,
                status: '영업중',
                closingTime: '24:00'
            },
            {
                name: '우리은행 한국외대지점',
                category: PlaceCategory.FINANCIAL,
                latitude: 37.5965,
                longitude: 127.0585,
                address: '서울 동대문구 이문동',
                tags: ['은행', 'ATM', '학생증발급'],
                image: 'https://via.placeholder.com/300x150',
                rating: 4.2,
                reviewCount: 30,
                status: '영업중',
                closingTime: '16:00'
            },
            {
                name: '경희대학교병원',
                category: PlaceCategory.MEDICAL,
                latitude: 37.5940,
                longitude: 127.0520,
                address: '서울 동대문구 회기동',
                tags: ['대학병원', '종합병원', '응급실'],
                image: 'https://via.placeholder.com/300x150',
                rating: 4.8,
                reviewCount: 150,
                status: '영업중',
                closingTime: '24:00'
            }
        ];

        for (const place of places) {
            await this.placesRepository.save(this.placesRepository.create(place));
        }
        console.log('Seeded places data');
    }

    async findAllNear(lat: number, lng: number, category?: PlaceCategory, radiusKm: number = 10) {
        // Haversine formula for distance
        // SQLite doesn't have native SQRT or POWER functions easily accessible in standard TypeORM query builder without raw query
        // So we'll fetch all (or filtered by category) and filter in memory for simplicity, assuming small dataset.
        // For production, use PostGIS or raw SQL with extensions.

        let query = this.placesRepository.createQueryBuilder('place');

        if (category && category !== PlaceCategory.OTHER) { // Assuming 'OTHER' or 'ALL' logic handled in controller or here
            query = query.where('place.category = :category', { category });
        }

        const places = await query.getMany();

        return places.map(place => {
            const distance = this.calculateDistance(lat, lng, place.latitude, place.longitude);
            return { ...place, distance };
        }).filter(place => place.distance <= radiusKm)
            .sort((a, b) => a.distance - b.distance);
    }

    private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371; // Radius of the earth in km
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    }

    async findOne(id: number): Promise<Place | null> {
        return this.placesRepository.findOne({ where: { id } });
    }

    async createReview(placeId: number, userEmail: string, content: string, rating: number): Promise<Review> {
        const place = await this.placesRepository.findOne({ where: { id: placeId } });
        if (!place) {
            throw new Error('Place not found');
        }

        const user = await this.usersRepository.findOne({ where: { email: userEmail } });
        if (!user) {
            throw new Error('User not found');
        }

        const review = this.reviewsRepository.create({
            content,
            rating,
            place,
            user
        });

        const savedReview = await this.reviewsRepository.save(review);

        // Update place rating and review count
        const reviews = await this.reviewsRepository.find({ where: { place: { id: placeId } } });
        const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
        place.rating = parseFloat((totalRating / reviews.length).toFixed(1));
        place.reviewCount = reviews.length;
        await this.placesRepository.save(place);

        return savedReview;
    }

    async getReviews(placeId: number): Promise<Review[]> {
        return this.reviewsRepository.find({
            where: { place: { id: placeId } },
            order: { createdAt: 'DESC' },
            relations: ['user']
        });
    }

    async getReviewSummary(placeId: number): Promise<string> {
        if (!this.model) {
            return "Review summary unavailable (API Key missing).";
        }

        const reviews = await this.getReviews(placeId);
        if (reviews.length === 0) {
            return "No reviews to summarize.";
        }

        const reviewTexts = reviews.map(r => r.content).join("\n");
        const prompt = `Summarize the following reviews for a place in Korean. Focus on the main pros and cons mentioned by users. Keep it concise (2-3 sentences).\n\nReviews:\n${reviewTexts}`;

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error("Gemini API Error:", error);
            return "Failed to generate summary.";
        }
    }

    private deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
    }
}
