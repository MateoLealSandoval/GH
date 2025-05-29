import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateDivipolaCountryDto {
  @IsString()
  @IsNotEmpty()
  officialISOName: string;

  @IsString()
  @Length(2)
  alpha2Code: string;

  @IsString()
  @Length(3)
  alpha3Code: string;

  @IsString()
  @Length(3)
  numericCode: string;
}
