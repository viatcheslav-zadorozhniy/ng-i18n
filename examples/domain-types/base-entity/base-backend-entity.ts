import { BaseEntity } from './base-entity';

/**
 * It is a simulation of the Mongoose's `Schema.Types.ObjectId` type.
 */
class ObjectId {
  static readonly schemaName: 'ObjectId';
}

/**
 * It is an alternative approach to the parameterized type of the `id` field in the `BaseEntity` type.
 *
 * It can be used in the following way:
 * export type BackendUser = BackendEntity<User>;
 *
 * The downside of this approach is that we need to define a separate type for each entity.
 */
export type BackendEntity<T extends BaseEntity> = Omit<T, 'id'> & { id: ObjectId };
