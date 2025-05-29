import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  lastname: string;

  @IsString()
  @MinLength(6)
  numberId: string;

  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(6)
  phoneNumber: string;

  @IsOptional()
  isActive?: boolean;
}
