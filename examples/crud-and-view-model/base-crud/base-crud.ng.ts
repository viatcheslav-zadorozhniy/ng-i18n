import { Observable } from 'rxjs';

import { BaseEntity, BaseViewModel, CrudPayload, PaginatedResult, QueryParams } from '../../shared';

/**
 * This is the base class for all CRUD services.
 * It defines the basic CRUD operations that all services should implement.
 */
export abstract class BaseCrud<
  TEntity extends BaseEntity,
  TViewModel extends BaseViewModel<TEntity>
> {
  abstract create(payload: CrudPayload<TEntity>): Observable<TViewModel>;
  abstract read(id: TEntity['id']): Observable<TViewModel>;
  abstract readMany(params?: QueryParams<TEntity>): Observable<PaginatedResult<TViewModel>>;
  abstract update(id: TEntity['id'], payload: CrudPayload<TEntity>): Observable<TViewModel>;
  abstract delete(id: TEntity['id']): Observable<void>;
}
