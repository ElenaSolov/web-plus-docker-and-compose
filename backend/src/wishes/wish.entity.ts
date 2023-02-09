import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsOptional, IsUrl, Length, Min } from 'class-validator';
import { UserEntity } from '../users/user.entity';
import { OfferEntity } from '../offers/offer.entity';

@Entity()
export class WishEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 250)
  @IsNotEmpty()
  name: string;

  @Column()
  @Length(1, 1024)
  @IsNotEmpty()
  description: string;

  @Column()
  @IsUrl()
  @IsNotEmpty()
  link: string;

  @Column()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @Column({ type: 'decimal', scale: 2, default: 1 })
  @IsNotEmpty()
  @Min(1)
  price: number;

  @Column({ default: 0 })
  @IsOptional()
  @IsNotEmpty()
  @Min(1)
  raised: number;

  @Column({ default: 0 })
  @IsOptional()
  copied: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.wishes)
  @JoinColumn()
  owner: UserEntity;

  @OneToMany(() => OfferEntity, (offer) => offer.item)
  offers: OfferEntity[];
}
