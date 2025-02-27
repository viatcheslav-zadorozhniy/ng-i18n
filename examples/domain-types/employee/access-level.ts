/**
 * An alternative way to define access levels instead of using enums.
 * It is easy to iterate over the roles.
 * The array can be used in the UI to display the roles.
 * The array can be used to validate the roles (e.g., in the DB schema definition).
 */
export const ACCESS_LEVELS = [
  'admin',
  'guest',
  'user',
] as const;

/**
 * The type of an access level.
 * It is a union of the access levels defined in the `ACCESS_LEVELS` array.
 */
export type AccessLevel = typeof ACCESS_LEVELS[number];
