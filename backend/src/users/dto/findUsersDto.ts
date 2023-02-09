import { IsNotEmpty } from 'class-validator';

export class FindUsersDto {
  @IsNotEmpty()
  public query: string;
}
