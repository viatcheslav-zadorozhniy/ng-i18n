import { BaseEntity } from './base-entity';

/**
 * This base entity type helps to avoid code duplication.
 * It includes the fields that are common to all entities that can be edited.
 */
export type BaseEditableEntity<EntityId = string> = BaseEntity<EntityId> & {
  createdAt: Date;
  updatedAt: Date;
};
