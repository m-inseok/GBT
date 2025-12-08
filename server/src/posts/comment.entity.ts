import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../auth/user.entity';
import { Post } from './post.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    author: User;

    @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'postId' })
    post: Post;
}
