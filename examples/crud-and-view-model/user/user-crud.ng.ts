import { Injectable, isDevMode } from '@angular/core';

import { BaseCrud } from '../base-crud';
import { User, UserViewModel } from '../../shared';

import { UserCrudFireStore } from './firestore';
import { UserCrudRest } from './rest';

/**
 * This is an example of a CRUD service for users that extends the `BaseCrud` class.
 * It is agnostic of the underlying data source (Firestore, RESTful API, etc.).
 * It is easy to switch between different data sources by changing the `useExisting` property.
 * The service consumers do not need to know the implementation details.
 */
@Injectable({
  providedIn: 'root',
  useExisting: isDevMode() ? UserCrudFireStore : UserCrudRest
})
export abstract class UserCrud extends BaseCrud<User, UserViewModel> {
  /**
   * The custom methods for the user CRUD service can be added here.
   * They will be available in the derived classes.
   *
   * Example:
   * abstract resetPassword(email: string): Observable<void>;
   * abstract updatePhoto(photo: File): Observable<User>;
   */
}
