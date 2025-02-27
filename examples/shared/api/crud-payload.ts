import { BaseEntity } from '../base-entity';

export type CrudPayload<TEntity = BaseEntity> = Partial<Omit<TEntity, 'id'>>;
