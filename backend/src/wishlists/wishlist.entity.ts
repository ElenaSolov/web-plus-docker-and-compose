import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsOptional, IsUrl, Length } from 'class-validator';
import { UserEntity } from '../users/user.entity';
import { WishEntity } from '../wishes/wish.entity';

@Entity()
export class WishlistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(0, 250)
  @IsNotEmpty()
  name: string;

  @Column({ default: '' })
  @IsOptional()
  @Length(0, 1500)
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.wishlists)
  owner: UserEntity;

  @ManyToMany(() => WishEntity, (wish) => wish.id)
  @JoinTable()
  items: WishEntity[];
}
