import { IsNotEmpty, IsString } from 'class-validator';
export class AddPostDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}
