import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostEntity } from './entity/post.entity';
import { AddPostDto } from './dto/add-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../user/guards/jwt-auth.guard';
import { User } from '../decorators/user.decorator';
import { UserEntity } from '../user/entity/user.entity';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async getAllPost(): Promise<PostEntity[]> {
    return await this.postService.getPosts();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async addPost(
    @Body() addPostDto: AddPostDto,
    @User() user: UserEntity,
  ): Promise<PostEntity> {
    return await this.postService.addPost(addPostDto, user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getPost(
    @Param('id', ParseIntPipe) id,
    @User() user,
  ): Promise<PostEntity> {
    return await this.postService.getPostById(id, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @Body() updatePostDto: UpdatePostDto,
    @Param('id', ParseIntPipe) id: number,
    @User() user,
  ): Promise<PostEntity> {
    return await this.postService.updatePost(id, updatePostDto, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deletePost(@Param('id', ParseIntPipe) id: number) {
    return await this.postService.deletePost(id);
  }

  @Delete('softDelete/:id')
  @UseGuards(JwtAuthGuard)
  async softDeletePost(@Param('id', ParseIntPipe) id: number, @User() user) {
    return await this.postService.softDeletePost(id, user);
  }

  @Get('restore/:id')
  @UseGuards(JwtAuthGuard)
  async restorePost(@Param('id', ParseIntPipe) id: number, @User() user) {
    return await this.postService.restorePost(id, user);
  }
}
