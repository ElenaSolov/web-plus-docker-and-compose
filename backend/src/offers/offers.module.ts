import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferEntity } from './offer.entity';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { WishesModule } from '../wishes/wishes.module';

@Module({
  imports: [TypeOrmModule.forFeature([OfferEntity]), WishesModule],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
