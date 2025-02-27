import { BaseEntity } from '../base-entity';

/**
 * Common type for listing query parameters.
 * This structure is agnostic of any specific API implementation.
 */
export type QueryParams<TEntity extends BaseEntity = BaseEntity> = {
  pagination?: {
    number: number;
    size: number;
  };
  sort?: {
    field: keyof TEntity;
    direction: 'asc' | 'desc';
  };
  filters?: Partial<Record<keyof TEntity, unknown>>;
};
