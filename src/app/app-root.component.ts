import { PlatformLocation } from '@angular/common';
import { ChangeDetectionStrategy, Component, InjectionToken, LOCALE_ID, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { Locale, localeStorageKey } from './locale';

export const JIT_TRANSLATION = new InjectionToken<boolean>('JIT_TRANSLATION');

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
})
export class AppRootComponent {
  readonly currentLocaleId = inject(LOCALE_ID);

  readonly locales: { id: Locale; label: string }[] = [
    { id: 'en', label: 'English' },
    { id: 'he', label: 'עברית' },
    { id: 'uk', label: 'Українська' },
  ];

  #jitTranslation = inject(JIT_TRANSLATION);
  #platformLocation = inject(PlatformLocation);

  handleLocaleChange(localeId: Locale): void {
    if (this.#jitTranslation) {
      localStorage.setItem(localeStorageKey, localeId);
      location.reload();
    } else {
      const baseHref = this.#platformLocation.getBaseHrefFromDOM();
      location.href = location.href.replace(baseHref, `/${localeId}/`);
    }
  }
}
