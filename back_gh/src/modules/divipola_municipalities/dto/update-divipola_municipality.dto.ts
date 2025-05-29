import { PartialType } from '@nestjs/mapped-types';
import { CreateDivipolaMunicipalityDto } from './create-divipola_municipality.dto';

export class UpdateDivipolaMunicipalityDto extends PartialType(
  CreateDivipolaMunicipalityDto,
) {}
