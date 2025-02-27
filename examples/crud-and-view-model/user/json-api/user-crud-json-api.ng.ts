import { Injectable } from '@angular/core';

import { BaseCrudJsonApi } from '../../base-crud';
import { User, UserViewModel } from '../../../shared';
import { UserCrud } from '../user-crud.ng';

/**
 * This is an example of a CRUD service for users that uses a RESTful API.
 * By extending the `BaseCrudRest` class, it reduces the boilerplate code.
 */
@Injectable({
  providedIn: 'root'
})
export class UserCrudJsonApi
  extends BaseCrudJsonApi<User, UserViewModel>
  implements UserCrud
{
  protected override entityRoute = '/api/users';
  protected override entityType = 'users';
  protected override entityViewModel = UserViewModel;
}
