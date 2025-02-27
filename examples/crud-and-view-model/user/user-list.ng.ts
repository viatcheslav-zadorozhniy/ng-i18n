import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { UserCrud } from './user-crud.ng';

@Component({
  // ...
  template: `
    @let users = users$ | async;

    @for (user of users?.items; track user.id) {
    <div>{{ user.email }}</div>
    }

    <div>Total: {{ users?.total }}</div>
  `,
  imports: [AsyncPipe]
})
export class UserList {
  users$ = inject(UserCrud).readMany();
}
