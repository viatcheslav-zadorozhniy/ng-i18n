import { Pipe, PipeTransform } from '@angular/core';

import { EnumValuesToObject, UserStatus } from '../../../types';

const TRANSLATIONS: EnumValuesToObject<UserStatus> = {
  active: $localize`:@@userStatus.active:active`,
  deleted: $localize`:@@userStatus.deleted:deleted`,
};

@Pipe({
  standalone: true,
  name: 'userStatusI18n',
})
export class UserStatusI18nPipe implements PipeTransform {
  transform(userStatus: UserStatus): string {
    return TRANSLATIONS[userStatus];
  }
}
