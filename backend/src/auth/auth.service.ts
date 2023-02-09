import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/createUserDto';
import { UsersService } from '../users/users.service';
import { SigninUserDto } from '../users/dto/signinUserDto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './IJwtPayload';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  async signIn(
    signinUserDto: SigninUserDto,
  ): Promise<{ access_token: string }> {
    const { username, password } = signinUserDto;
    const user = await this.usersService.getByUsernamePrivate(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: IJwtPayload = { userId: user.id };
      const access_token: string = await this.jwtService.sign(payload);
      return { access_token };
    } else {
      throw new UnauthorizedException('Please check your login details');
    }
  }
}
