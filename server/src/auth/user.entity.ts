import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    nickname: string;

    @Column()
    password: string;

    @Column({ default: false })
    isSubscribed: boolean;

    @Column({ nullable: true })
    location: string;

    @Column({ nullable: true })
    introduction: string;

    @Column('float', { nullable: true })
    latitude: number;

    @Column('float', { nullable: true })
    longitude: number;
}
