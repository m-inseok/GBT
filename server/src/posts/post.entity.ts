import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../auth/user.entity';
import { Comment } from './comment.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User)
    author: User;

    @Column({ default: 0 })
    likes: number;

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];
}
