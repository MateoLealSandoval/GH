import { PartialType } from '@nestjs/mapped-types';
import { CreateDivipolaCountryDto } from './create-divipola_country.dto';

export class UpdateDivipolaCountryDto extends PartialType(
  CreateDivipolaCountryDto,
) {}
