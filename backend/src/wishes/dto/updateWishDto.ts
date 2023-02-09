import { Column } from 'typeorm';
import { IsNotEmpty, IsOptional, IsUrl, Length, Min } from 'class-validator';

export class UpdateWishDto {
  @Column()
  @IsOptional()
  @IsNotEmpty()
  @Length(1, 250)
  @IsOptional()
  name: string;

  @Column()
  @Length(1, 1024)
  @IsOptional()
  @IsNotEmpty()
  description: string;

  @Column()
  @IsOptional()
  @IsUrl()
  @IsNotEmpty()
  link: string;

  @Column()
  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @Column({ type: 'decimal', scale: 2, default: 1 })
  @IsOptional()
  @IsNotEmpty()
  @Min(1)
  price: number;
}
