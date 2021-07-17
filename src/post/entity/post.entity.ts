import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntites } from '../../generics/timestamp.entites';
import { UserEntity } from '../../user/entity/user.entity';

@Entity('post')
export class PostEntity extends TimestampEntites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 1000,
  })
  content: string;

  @ManyToOne((type) => UserEntity, (user) => user.posts, {
    cascade: ['insert', 'update'],
    nullable: true,
    eager: true,
  })
  user: UserEntity;
}
