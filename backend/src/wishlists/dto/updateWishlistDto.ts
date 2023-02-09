import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Length,
} from 'class-validator';

export class UpdateWishlistDto {
  @IsOptional()
  @Length(0, 250)
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUrl()
  image;

  @IsOptional()
  @Length(0, 1500)
  description: string;

  @IsOptional()
  @IsArray()
  itemsId: Array<number>;
}
