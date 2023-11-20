import { Pipe, PipeTransform } from '@angular/core';

import { EnumValuesToObject, UserRole } from '../../../types';

const TRANSLATIONS: EnumValuesToObject<UserRole> = {
  admin: $localize`:@@userRole.admin:admin`,
  user: $localize`:@@userRole.user:user`,
};

@Pipe({
  standalone: true,
  name: 'userRoleI18n',
})
export class UserRoleI18nPipe implements PipeTransform {
  transform(userRole: UserRole): string {
    return TRANSLATIONS[userRole];
  }
}
