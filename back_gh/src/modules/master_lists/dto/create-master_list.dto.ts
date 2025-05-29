import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMasterListDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}
