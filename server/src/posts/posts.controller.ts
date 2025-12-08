import { Controller, Post, Body, Get, Query, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Post()
    createPost(@Body() body: any) {
        return this.postsService.createPost(body);
    }

    @Get()
    getPosts(@Query('sort') sort: 'latest' | 'popular', @Query('email') email?: string) {
        return this.postsService.findAll(sort, email);
    }

    @Get(':id')
    getPost(@Param('id') id: number, @Query('email') email?: string) {
        return this.postsService.findOne(id, email);
    }

    @Post(':id/like')
    likePost(@Param('id') id: number, @Body('email') email: string) {
        return this.postsService.likePost(id, email);
    }

    @Post(':id/comments')
    createComment(@Param('id') id: number, @Body('content') content: string, @Body('email') email: string) {
        return this.postsService.createComment(id, content, email);
    }

    @Get(':id/comments')
    getComments(@Param('id') id: number) {
        return this.postsService.getComments(id);
    }

    @Delete(':id')
    deletePost(@Param('id') id: number, @Body('email') email: string) {
        return this.postsService.deletePost(id, email);
    }
}
