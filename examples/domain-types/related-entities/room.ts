import { BaseEditableEntity } from '../base-entity';

import { Property } from './property';

/**
 * It is an example of a related entity.
 * It has a many-to-one relationship with the `Property` entity.
 * By default, the related property is represented by its ID.
 */
export type Room = BaseEditableEntity & {
  name: string;
  property: Property['id'];
};

/**
 * It can be useful to have a type that includes the related entity itself, not just its ID.
 * For example, when you fetch the entity from the database with a JOIN query.
 * You can simplify handling such cases by defining a separate type with the populated related entity.
 */
export type PopulatedRoom = Room & {
  property: Property;
};
