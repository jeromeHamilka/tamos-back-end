import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entity/post.entity';
import { Repository } from 'typeorm';
import { AddPostDto } from './dto/add-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserEntity } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    private userService: UserService,
  ) {}

  async getPostById(id: number, user) {
    const post = await this.postRepository.findOne(id);
    if (!post) {
      throw new NotFoundException(`Le post d'id ${id} n'existe pas`);
    }
    // Si on est admin ou si on est admin et on a pas de user
    if (this.userService.isOwnerOrAdmin(post, user)) return post;
    else throw new UnauthorizedException();
  }

  async getPosts(): Promise<PostEntity[]> {
    return await this.postRepository.find();
  }

  async addPost(post: AddPostDto, user: UserEntity): Promise<PostEntity> {
    const newPost = this.postRepository.create(post);
    newPost.user = user;
    return await this.postRepository.save(newPost);
  }

  async updatePost(id: number, post: UpdatePostDto, user): Promise<PostEntity> {
    const newPost = await this.postRepository.preload({
      id,
      ...post,
    });
    if (!newPost) {
      throw new NotFoundException(`Le post d'id ${id} n'existe pas`);
    }
    //sauvgarder la nouvelle entité donc le nouveau cv
    if (this.userService.isOwnerOrAdmin(newPost, user))
      return await this.postRepository.save(newPost);
    else new UnauthorizedException('');
  }

  async deletePost(id: number) {
    await this.findById(id);
    return await this.postRepository.delete(id);
  }

  private async findById(id: number) {
    const post = await this.postRepository.findOne(id);
    if (!post) {
      throw new NotFoundException(`Le post d'id ${id} n'existe pas`);
    }
  }

  async softDeletePost(id: number, user) {
    const post = await this.postRepository.findOne({ id });
    console.log('post', post);
    if (!post) {
      throw new NotFoundException('');
    }
    if (this.userService.isOwnerOrAdmin(post, user))
      return this.postRepository.softDelete(id);
    else throw new UnauthorizedException('');
  }

  async restorePost(id: number, user) {
    const post = await this.postRepository.query(
      'select * from post where id = ?',
      [id],
    );
    if (!post) {
      throw new NotFoundException('');
    }
    if (this.userService.isOwnerOrAdmin(post, user))
      return this.postRepository.restore(id);
    else throw new UnauthorizedException('');
  }
}
