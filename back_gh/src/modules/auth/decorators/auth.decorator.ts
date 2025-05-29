import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from '../../../common/enums/role.enum';
import { Roles } from './role.decorator';
import { RolesGuard } from '../guard/roles.guard';
import { AuthGuard } from '../guard/auth.guard';

export function Auth(...roles: Role[]) {
  return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard));
}
