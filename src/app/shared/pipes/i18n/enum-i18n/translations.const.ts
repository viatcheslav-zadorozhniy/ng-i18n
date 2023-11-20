import { EnumValuesToObject } from '../../../types';

import { TranslatableEnums } from './translatable-enums.type';

type Translations = {
  [T in keyof TranslatableEnums]: EnumValuesToObject<TranslatableEnums[T]>
};

export const TRANSLATIONS: Translations = {
  userRole: {
    admin: $localize`:@@userRole.admin:admin`,
    user: $localize`:@@userRole.user:user`,
  },
  userStatus: {
    active: $localize`:@@userStatus.active:active`,
    deleted: $localize`:@@userStatus.deleted:deleted`,
  },
};
