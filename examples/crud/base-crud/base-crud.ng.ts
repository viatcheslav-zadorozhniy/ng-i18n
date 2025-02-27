import { Observable } from 'rxjs';

import { BaseEntity, CrudPayload, QueryParams } from '../../shared';

/**
 * This is the base class for all CRUD services.
 * It defines the basic CRUD operations that all services should implement.
 */
export abstract class BaseCrud<TEntity extends BaseEntity> {
  abstract create(payload: CrudPayload<TEntity>): Observable<TEntity>;
  abstract read(id: TEntity['id']): Observable<TEntity>;
  abstract readMany(params?: QueryParams<TEntity>): Observable<TEntity[]>;
  abstract update(id: TEntity['id'], payload: CrudPayload<TEntity>): Observable<TEntity>;
  abstract delete(id: TEntity['id']): Observable<void>;
}
