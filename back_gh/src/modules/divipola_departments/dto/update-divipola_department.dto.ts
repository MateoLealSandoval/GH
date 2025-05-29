import { PartialType } from '@nestjs/mapped-types';
import { CreateDivipolaDepartmentDto } from './create-divipola_department.dto';

export class UpdateDivipolaDepartmentDto extends PartialType(
  CreateDivipolaDepartmentDto,
) {}
