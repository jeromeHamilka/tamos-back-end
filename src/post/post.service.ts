import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entity/post.entity';
import { Repository } from 'typeorm';
import { AddPostDto } from './dto/add-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async getPosts(): Promise<PostEntity[]> {
    return await this.postRepository.find();
  }

  async addPost(post: AddPostDto): Promise<PostEntity> {
    const newPost = this.postRepository.create(post);
    console.log('newPost: ', newPost);
    console.log('post: ', post);
    return await this.postRepository.save(newPost);
  }
}
