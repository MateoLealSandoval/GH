import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDivipolaDepartmentDto {
  @IsNotEmpty()
  @IsString()
  officialISOName: string;

  @IsNotEmpty()
  @IsString()
  numericCode: string;

  @IsNotEmpty()
  @IsNumber()
  countryId: number;
}
