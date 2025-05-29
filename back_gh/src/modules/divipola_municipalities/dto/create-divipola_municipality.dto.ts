import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDivipolaMunicipalityDto {
  @IsNotEmpty()
  @IsString()
  officialISOName: string;

  @IsNotEmpty()
  @IsString()
  numericCode: string;

  @IsNotEmpty()
  @IsNumber()
  deparmentId: number;
}
