import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Review } from './review.entity';

export enum PlaceCategory {
    MEDICAL = 'medical',
    FINANCIAL = 'financial',
    RESIDENTIAL = 'residential',
    OTHER = 'other'
}

@Entity()
export class Place {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: 'simple-enum',
        enum: PlaceCategory,
        default: PlaceCategory.OTHER
    })
    category: PlaceCategory;

    @Column('float')
    latitude: number;

    @Column('float')
    longitude: number;

    @Column()
    address: string;

    @Column('simple-array', { nullable: true })
    tags: string[];

    @Column({ nullable: true })
    image: string;

    @Column('float', { default: 0 })
    rating: number;

    @Column({ default: 0 })
    reviewCount: number;

    @Column({ default: '영업중' })
    status: string;

    @Column({ nullable: true })
    closingTime: string;

    @OneToMany(() => Review, (review) => review.place)
    reviews: Review[];
}
