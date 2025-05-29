import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SkillType } from '../entities/skill.entity';

export class CreateSkillDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(SkillType)
  type: SkillType;

  @IsBoolean()
  createdbyAI: boolean;
}
