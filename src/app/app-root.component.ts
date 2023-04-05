import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, LOCALE_ID, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { Locale, localeStorageKey } from './locale';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    NgFor,
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

  handleLocaleChange(localeId: Locale): void {
    globalThis.localStorage.setItem(localeStorageKey, localeId);
    globalThis.location.reload();
  }
}
