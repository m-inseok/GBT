import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../auth/user.entity';
import { Post } from './post.entity';

@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Post)
    @JoinColumn({ name: 'postId' })
    post: Post;
}
