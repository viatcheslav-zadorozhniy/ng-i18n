import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { User } from '../../domain';
import { FeedbackFormComponent } from '../../shared';

@Component({
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CurrencyPipe,
    DatePipe,
    FeedbackFormComponent,
    RouterLink,
  ],
})
export class HomeComponent implements OnInit {
  readonly user: User = {
    firstName: 'John',
    lastName: 'Doe',
    gender: 'male',
  };

  readonly today = new Date();

  // https://angular.io/api/localize/init/$localize#description
  // https://angular.io/guide/i18n-common-prepare#mark-text-in-component-code
  readonly welcomeMessage = $localize
    `:@@welcomeMessage:Glad to see you again, ${this.user.firstName}:userFirstName: ${this.user.lastName}:userLastName:.`
  ;

  #meta = inject(Meta);

  ngOnInit(): void {
    this.#meta.updateTag({
      name: 'description',
      content: $localize`:Homepage description for SEO@@homePageSEODescription:Homepage meta description`,
    });
  }
}
