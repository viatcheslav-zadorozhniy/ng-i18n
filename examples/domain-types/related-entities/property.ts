import { BaseEditableEntity } from '../base-entity';

import { Room } from './room';

/**
 * It is an example of a related entities.
 * It has a one-to-many relationship with the `Room` entity.
 * By default, the related rooms are represented by their IDs.
 */
export type Property = BaseEditableEntity & {
  name: string;
  rooms: Room['id'][];
};

/**
 * It can be useful to have a type that includes the related entities themselves, not just their IDs.
 * For example, when you fetch the entity from the database with a JOIN query.
 * You can simplify handling such cases by defining a separate type with the populated related entities.
 */
export type PopulatedProperty = Property & {
  rooms: Room[];
};
