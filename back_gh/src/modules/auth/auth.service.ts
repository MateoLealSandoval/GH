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

  async login(loginDto: LoginDto) {
    console.log('🔍 Intentando login para:', loginDto.email); // Debug

    const user = await this.usersService.findOneByEmailWithPassword(
      loginDto.email,
    );

    console.log('👤 Usuario encontrado:', user ? 'Sí' : 'No'); // Debug

    if (!user) {
      console.log('❌ Usuario no encontrado'); // Debug
      throw new UnauthorizedException('Email or password invalid');
    }

    console.log('🔐 Verificando contraseña...'); // Debug
    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    console.log('✅ Contraseña válida:', isValidPassword); // Debug

    if (!isValidPassword) {
      console.log('❌ Contraseña inválida'); // Debug
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

    console.log('🎉 Login exitoso para:', user.email); // Debug

    return {
      access_token: token,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      role: user.role,
    };
  }
}
