import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { User } from '../../domain';

@Component({
  standalone: true,
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackFormComponent {
  readonly user = input.required<User>();
}
