import { Pipe, PipeTransform } from '@angular/core';

import { TRANSLATIONS } from './translations.const';
import { TranslatableEnums } from './translatable-enums.type';
import { EnumValuesToObject, ObjectValues } from '../../../types';

type TranslatableValue = ObjectValues<TranslatableEnums>;

@Pipe({
  standalone: true,
  name: 'enumI18n',
})
export class EnumI18nPipe implements PipeTransform {
  transform(value: TranslatableValue, enumKey: keyof TranslatableEnums): string {
    const translations = TRANSLATIONS[enumKey] as EnumValuesToObject<TranslatableValue>;

    if (!translations[value]) {
      console.error(`Translation not found for ${enumKey}.${value}`);
      return value;
    }

    return translations[value];
  }
}
