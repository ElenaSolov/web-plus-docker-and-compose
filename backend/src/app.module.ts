import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { UsersModule } from './users/users.module';
import { OffersModule } from './offers/offers.module';
import { UserEntity } from './users/user.entity';
import { WishEntity } from './wishes/wish.entity';
import { WishlistEntity } from './wishlists/wishlist.entity';
import { OfferEntity } from './offers/offer.entity';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config().db.host,
      port: config().db.port,
      username: config().db.username,
      password: config().db.password,
      database: config().db.databaseName,
      entities: [UserEntity, WishEntity, WishlistEntity, OfferEntity],
      synchronize: true,
    }),
    WishesModule,
    WishlistsModule,
    UsersModule,
    OffersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
