import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { PostEntity } from './entity/post.entity';
import { AddPostDto } from './dto/add-post.dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async getAllPost(): Promise<PostEntity[]> {
    return await this.postService.getPosts();
  }

  @Post()
  async addPost(@Body() addPostDto: AddPostDto): Promise<PostEntity> {
    return await this.postService.addPost(addPostDto);
  }
}
