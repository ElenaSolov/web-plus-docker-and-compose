import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty, IsUrl, Length, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';
import { WishEntity } from '../wishes/wish.entity';
import { OfferEntity } from '../offers/offer.entity';
import { WishlistEntity } from '../wishlists/wishlist.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Length(2, 30)
  @IsNotEmpty()
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  @Length(2, 200)
  @IsNotEmpty()
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsUrl()
  @IsNotEmpty()
  avatar: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => WishEntity, (wish) => wish.owner, { eager: true })
  wishes: WishEntity[];

  @OneToMany(() => OfferEntity, (offer) => offer.user, { eager: true })
  offers: OfferEntity[];

  @OneToMany(() => WishlistEntity, (wishlist) => wishlist.owner, {
    eager: true,
  })
  wishlists: WishlistEntity[];

  @Column()
  @MinLength(2)
  @Exclude()
  password: string;
}
