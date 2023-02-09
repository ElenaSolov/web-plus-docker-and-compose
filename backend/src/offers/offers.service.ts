import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { OfferEntity } from './offer.entity';
import { CreateOfferDto } from './dto/createOfferDto';
import { UserEntity } from '../users/user.entity';
import { WishesService } from '../wishes/wishes.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(OfferEntity)
    private offersRepository: Repository<OfferEntity>,
    @Inject(WishesService)
    private readonly wishesService: WishesService,
    private dataSource: DataSource,
  ) {}

  getAll(): Promise<OfferEntity[]> {
    return this.offersRepository.find({
      where: {},
      relations: ['user', 'item'],
    });
  }

  async getOfferById(id): Promise<OfferEntity> {
    const offer = await this.offersRepository.findOne({
      where: {
        id,
      },
      relations: ['item', 'user'],
    });
    if (!offer) {
      throw new NotFoundException(`Offer with id ${id} does not exist`);
    }
    return offer;
  }

  async createOffer(
    createOfferDto: CreateOfferDto,
    user: UserEntity,
  ): Promise<OfferEntity> {
    const { amount, hidden, itemId } = createOfferDto;
    const wish = await this.wishesService.getWishById(itemId);
    if (this.wishesService.checkOwner(wish, user)) {
      throw new ForbiddenException(
        'You can not make offers for your own wishes',
      );
    } else if (wish.raised + amount > wish.price) {
      throw new BadRequestException(
        `You can offer up to ${wish.price - wish.raised} for this offer`,
      );
    }
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const newOffer = this.offersRepository.create({
      amount,
      hidden,
      item: wish,
      user,
    });
    try {
      await this.offersRepository.save(newOffer);
      await this.wishesService.updateWishRaised(wish, amount);
      return newOffer;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(err.code);
    } finally {
      await queryRunner.release();
    }
  }
}
