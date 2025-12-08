import { Injectable } from '@nestjs/common';

@Injectable()
export class HospitalsService {
    getNearHospitals() {
        return [
            {
                id: 1,
                name: '의료법인 영훈의료재단 대전선병원',
                rating: 5.0,
                reviewCount: 145,
                status: '영업중',
                closingTime: '22:00',
                distance: '1.1km',
                address: '대전 중구',
                tags: ['외국인 친화적', '영어 가능', '민생회복소비쿠폰'],
                image: 'https://via.placeholder.com/300x150'
            },
            {
                id: 2,
                name: '삼성동새마을금고 본점',
                rating: 5.0,
                reviewCount: 145,
                status: '영업중',
                closingTime: '22:00',
                distance: '1.1km',
                address: '대전 중구',
                tags: ['외국인 친화적', '영어 가능', '주차가능'],
                image: 'https://via.placeholder.com/300x150'
            },
            {
                id: 3,
                name: 'GS한밭자이아파트',
                rating: 5.0,
                reviewCount: 145,
                status: '영업중',
                closingTime: '22:00',
                distance: '1.1km',
                address: '대전 중구',
                tags: ['외국인 친화적', '저렴한 월세', '외국인 다수거주'],
                image: 'https://via.placeholder.com/300x150'
            },
            {
                id: 4,
                name: '대전성모병원',
                rating: 4.8,
                reviewCount: 320,
                status: '영업중',
                closingTime: '24:00',
                distance: '2.3km',
                address: '대전 중구 대흥동',
                tags: ['응급실', '종합병원', '주차가능'],
                image: 'https://via.placeholder.com/300x150'
            },
            {
                id: 5,
                name: '충남대학교병원',
                rating: 4.9,
                reviewCount: 512,
                status: '영업중',
                closingTime: '24:00',
                distance: '3.5km',
                address: '대전 중구 문화동',
                tags: ['대학병원', '권역응급의료센터'],
                image: 'https://via.placeholder.com/300x150'
            }
        ];
    }
}
