import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findOneByEmail(registerDto.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const userRegister = { ...registerDto, password: hashedPassword };

    return await this.usersService.create(userRegister);
  }

  async login(logingDto: LoginDto) {
    const user = await this.usersService.findOneByEmailWithPassword(
      logingDto.email,
    );

    if (!user) {
      throw new UnauthorizedException('Email or password invalid');
    }

    const isValidPassword = await bcrypt.compare(
      logingDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Password invalid');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const token = await this.jwtService.signAsync(payload);
    user.lastLogin = new Date();
    const { id, ...updateData } = user;
    await this.usersService.update(id, updateData);

    return {
      access_token: token,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      role: user.role,
    };
  }
}
