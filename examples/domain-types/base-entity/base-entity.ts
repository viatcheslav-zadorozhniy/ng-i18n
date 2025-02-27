/**
 * We can use any type for the entity's identifier by making the `id` field parameterized.
 * E.g., we can use `Schema.Types.ObjectId` from Mongoose or `number` for auto-incrementing IDs.
 */
export type BaseEntity<EntityId = string> = {
  id: EntityId;
};
