import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Place } from './place.entity';
import { User } from '../auth/user.entity';

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    rating: number; // 0-5

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Place, (place) => place.reviews)
    place: Place;

    @ManyToOne(() => User, { eager: true }) // eager: true to fetch user info with review
    user: User;
}
