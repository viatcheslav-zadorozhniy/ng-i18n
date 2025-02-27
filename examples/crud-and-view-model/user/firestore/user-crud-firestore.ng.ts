import { Injectable } from '@angular/core';

import { BaseCrudFirestore } from '../../base-crud';
import { User, UserViewModel } from '../../../shared';
import { UserCrud } from '../user-crud.ng';

/**
 * This is an example of a CRUD service for users that uses Firestore.
 * By extending the `BaseCrudFirestore` class, it reduces the boilerplate code.
 */
@Injectable({
  providedIn: 'root'
})
export class UserCrudFireStore
  extends BaseCrudFirestore<User, UserViewModel>
  implements UserCrud
{
  protected override collectionName = 'users';
  protected override entityViewModel = UserViewModel;
}
