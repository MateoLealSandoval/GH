import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateMasterListDto {
  @IsOptional()
  @IsString()
  value?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
