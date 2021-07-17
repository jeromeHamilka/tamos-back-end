import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntites } from '../../generics/timestamp.entites';
import { Exclude } from 'class-transformer';
import { PostEntity } from '../../post/entity/post.entity';
import { UserRoleEnum } from '../../enums/user-role.enum';

@Entity('user')
export class UserEntity extends TimestampEntites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    unique: true,
  })
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role: string;

  @OneToMany((type) => PostEntity, (post) => post.user, {
    nullable: true,
    cascade: true,
  })
  posts: PostEntity[];
}
