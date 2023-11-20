import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

import { User } from '../../domain';
import { EnumI18nPipe, FeedbackFormComponent, UserRoleI18nPipe, UserStatusI18nPipe } from '../../shared';

@Component({
  standalone: true,
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeedbackFormComponent, EnumI18nPipe, UserRoleI18nPipe, UserStatusI18nPipe],
})
export class AboutComponent implements OnInit {
  readonly user: User = {
    firstName: 'Jane',
    lastName: 'Doe',
    gender: 'female',
  };

  #meta = inject(Meta);

  ngOnInit(): void {
    this.#meta.updateTag({
      name: 'description',
      content: $localize`:About page description for SEO@@aboutPageSEODescription:About page meta description`,
    });
  }
}
