import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

// A custom page title strategy can be used to append/prepend a page title with common wording.
@Injectable({ providedIn: 'root' })
export class PageTitleStrategy extends TitleStrategy {
  #title = inject(Title);

  // https://angular.io/guide/router#setting-the-page-title
  override updateTitle(snapshot: RouterStateSnapshot) {
    const title = this.buildTitle(snapshot);

    if (title !== undefined) {
      this.#title.setTitle(
        $localize`:Page title including application name@@fullPageTitle:${title}:pageTitle: | Application`
      );
    }
  }
}
