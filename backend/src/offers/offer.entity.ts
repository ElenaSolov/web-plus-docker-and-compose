import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { UserEntity } from '../users/user.entity';
import { WishEntity } from '../wishes/wish.entity';

@Entity()
export class OfferEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WishEntity)
  @JoinColumn()
  item: WishEntity;

  @Column()
  @IsNotEmpty()
  amount: number;

  @Column()
  @IsBoolean()
  hidden: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.offers)
  @JoinColumn()
  user: UserEntity;
}
