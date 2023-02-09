import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { WishEntity } from '../wishes/wish.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getHashedPassword(password) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async createUser(createUserDto: CreateUserDto) {
    const { username, about, email, password, avatar } = createUserDto;
    const hashedPassword = await this.getHashedPassword(password);
    const newUser = this.usersRepository.create({
      username,
      about,
      email,
      password: hashedPassword,
      avatar,
    });
    try {
      await this.usersRepository.save(newUser);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Email or username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return newUser;
  }

  async getByUsernamePrivate(username: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException(`${username} does not exist`);
    } else {
      return user;
    }
  }
  async getByUsernamePublic(username: string): Promise<Partial<UserEntity>> {
    const user = await this.getByUsernamePrivate(username);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { email, password, wishes, offers, wishlists, ...rest } = user;
    return rest;
  }

  getByUserId(id: number): Promise<UserEntity> {
    const user = this.usersRepository.findOne({
      where: { id },
      relations: ['wishlists', 'wishes', 'offers'],
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    } else {
      return user;
    }
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const { password } = updateUserDto;
    if (password) {
      const hashedPassword = await this.getHashedPassword(password);
      updateUserDto = { ...updateUserDto, password: hashedPassword };
    }
    try {
      await this.usersRepository.update({ id }, updateUserDto);
      return this.getByUserId(id);
    } catch (err) {
      throw new BadRequestException(`${err.detail}`);
    }
  }

  async getUserWishes(id: number): Promise<WishEntity[]> {
    const user = await this.getByUserId(id);
    return user.wishes;
  }

  async getUserWishesByUsername(username: string): Promise<WishEntity[]> {
    const user = await this.getByUsernamePrivate(username);
    return user.wishes;
  }

  getUsersByUsernameOrEmail(findUsersDto): Promise<UserEntity[]> {
    const { query } = findUsersDto;
    return this.usersRepository.find({
      where: [{ email: query }, { username: query }],
    });
  }
}
