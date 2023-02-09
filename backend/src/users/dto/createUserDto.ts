import { IsEmail, IsOptional, IsUrl, Length, MinLength } from 'class-validator';

export class CreateUserDto {
  @Length(1, 64)
  username: string;

  @IsOptional()
  @Length(0, 200)
  about: string;

  @IsOptional()
  @IsUrl()
  avatar: string;

  @IsEmail()
  email: string;

  @MinLength(2)
  password: string;
}
