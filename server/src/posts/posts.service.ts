import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../auth/user.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Like)
        private likesRepository: Repository<Like>,
    ) { }

    async createPost(body: any) {
        const { email, title, content } = body;
        const user = await this.usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const post = this.postsRepository.create({
            title,
            content,
            author: user
        });

        await this.postsRepository.save(post);

        return { success: true, message: 'Post created successfully', post };
    }

    async findAll(sort: 'latest' | 'popular', email?: string) {
        const query = this.postsRepository.createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author')
            .take(5);

        if (sort === 'popular') {
            query.orderBy('post.likes', 'DESC');
        } else {
            query.orderBy('post.createdAt', 'DESC');
        }

        const posts = await query.getMany();

        // Map likes count and isLiked status
        const result = await Promise.all(posts.map(async (post) => {
            let isLiked = false;
            if (email) {
                const user = await this.usersRepository.findOne({ where: { email } });
                if (user) {
                    const like = await this.likesRepository.findOne({
                        where: { post: { id: post.id }, user: { id: user.id } }
                    });
                    isLiked = !!like;
                }
            }
            return {
                ...post,
                isLiked
            };
        }));

        return result;
    }

    async likePost(postId: number, email: string) {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const post = await this.postsRepository.findOne({ where: { id: postId } });
        if (!post) {
            throw new NotFoundException('Post not found');
        }

        const existingLike = await this.likesRepository.findOne({
            where: { post: { id: postId }, user: { id: user.id } }
        });

        if (existingLike) {
            await this.likesRepository.remove(existingLike);
            post.likes = Math.max(0, post.likes - 1);
        } else {
            const like = this.likesRepository.create({ post, user });
            await this.likesRepository.save(like);
            post.likes += 1;
        }

        await this.postsRepository.save(post);

        return { success: true, likes: post.likes, isLiked: !existingLike };
    }
    async findOne(id: number, email?: string) {
        const post = await this.postsRepository.findOne({
            where: { id },
            relations: ['author']
        });

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        let isLiked = false;
        if (email) {
            const user = await this.usersRepository.findOne({ where: { email } });
            if (user) {
                const like = await this.likesRepository.findOne({
                    where: { post: { id: post.id }, user: { id: user.id } }
                });
                isLiked = !!like;
            }
        }

        return {
            ...post,
            isLiked
        };
    }

    async createComment(postId: number, content: string, email: string) {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const post = await this.postsRepository.findOne({ where: { id: postId } });
        if (!post) {
            throw new NotFoundException('Post not found');
        }

        const comment = this.likesRepository.manager.getRepository(Comment).create({
            content,
            post,
            author: user
        });

        await this.likesRepository.manager.getRepository(Comment).save(comment);

        return { success: true, comment };
    }

    async getComments(postId: number) {
        return this.likesRepository.manager.getRepository(Comment).find({
            where: { post: { id: postId } },
            relations: ['author'],
            order: { createdAt: 'ASC' }
        });
    }

    async deletePost(id: number, email: string) {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const post = await this.postsRepository.findOne({
            where: { id },
            relations: ['author']
        });

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        if (post.author.email !== email) {
            throw new NotFoundException('Unauthorized');
        }

        await this.postsRepository.remove(post);

        return { success: true };
    }
}
