import { BaseViewModel } from '../../shared';

import { User } from './user';

/**
 * This is the view model for the User entity.
 * It extends from the `BaseViewModel` class to avoid code duplication.
 *
 * Such view models are useful to encapsulate the business logic related to the entity.
 * In this case, the `UserViewModel` class provides a method to check if the user is an adult.
 */
export class UserViewModel extends BaseViewModel<User> {
  readonly age = this.dto.age;
  readonly email = this.dto.email;

  isAdult() {
    return this.age >= 18;
  }
}
