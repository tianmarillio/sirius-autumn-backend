import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user-dto';
import { LoginUserDto } from './dto/login-user-dto copy';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { NanoidService } from 'src/utils/nanoid/nanoid.service';
import { BcryptService } from 'src/utils/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private nanoid: NanoidService,
    private bcrypt: BcryptService,
    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        username: registerUserDto.username,
      },
    });

    if (foundUser) {
      throw new BadRequestException('Username already exist');
    }

    const hashed = this.bcrypt.hashSync(registerUserDto.password);

    // TODO: handle other create error
    const created = await this.prisma.user.create({
      data: {
        id: this.nanoid.get(),
        username: registerUserDto.username,
        password: hashed,
      },
    });

    return {
      id: created.id
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        username: loginUserDto.username,
      },
    });

    if (!foundUser) {
      throw new BadRequestException('Invalid credentials');
    }

    const isMatch = this.bcrypt.compareSync(
      loginUserDto.password,
      foundUser.password,
    );

    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    return {
      token: this.jwtService.sign({
        id: foundUser.id,
        username: foundUser.username,
      }),
    };
  }
}
