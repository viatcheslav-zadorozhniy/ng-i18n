import { BaseEditableEntity } from '../base-entity';

import { AccessLevel } from './access-level';

/**
 * This is an example of a base helper entity usage.
 */
export type Employee<EmployeeId = string> = BaseEditableEntity<EmployeeId> & {
  name: string;
  email: string;
  accessLevel: AccessLevel;
};
