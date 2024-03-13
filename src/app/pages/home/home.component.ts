import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { User } from '../../domain';
import { FeedbackFormComponent } from '../../shared';

@Component({
  standalone: true,
  selector: 'app-home',
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
export class HomeComponent {
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
}
