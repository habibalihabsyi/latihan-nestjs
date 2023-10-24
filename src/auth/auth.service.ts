import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { jwt } from 'src/config/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const checkUser = await this.prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });
    if (checkUser) {
      throw new HttpException('User sudah terdaftar', HttpStatus.FOUND);
    }
    data.password = await hash(data.password, 12);
    const createUser = await this.prisma.users.create({
      data,
    });
    if (createUser) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Register Berhasil',
      };
    }
  }

  /**
   * Find user by id
   * @param user_id
   */
  async profile(user_id: number) {
    const dataUser = await this.prisma.users.findFirst({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        tasks: true,
      },
    });
    if (dataUser) {
      return {
        statusCode: HttpStatus.OK,
        data: dataUser,
      };
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
  /**
   * Login user
   * @param data
   * @returns
   */
  async login(data: LoginDto) {
    const checkUser = await this.prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });
    if (!checkUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const checkPassword = await compare(data.password, checkUser.password);
    if (checkPassword) {
      const accessToken = this.generateJWT({
        sub: checkUser.id,
        name: checkUser.name,
        email: checkUser.email,
      });
      return {
        statusCode: HttpStatus.OK,
        accessToken,
        message: 'Login berhasil',
      };
    } else {
      throw new HttpException(
        'Email or password not match',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
  /**
   * Upload Avatar
   * @param user_id
   * @param avatar
   */
  async uploadAvatar(user_id: number, avatar) {
    const checkUserExists = await this.prisma.users.findFirst({
      where: {
        id: user_id,
      },
    });
    if (checkUserExists) {
      const updateAvatar = await this.prisma.users.update({
        data: {
          avatar: avatar,
        },
        where: {
          id: user_id,
        },
      });
      if (updateAvatar) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Upload avatar berhasil',
        };
      }
    }
    return new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }
  generateJWT(payload: any) {
    return this.jwtService.sign(payload, {
      secret: jwt.secret,
      expiresIn: jwt.expires,
    });
  }
}
