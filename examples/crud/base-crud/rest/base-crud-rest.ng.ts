import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

import { BaseCrud } from '../base-crud.ng';
import { BaseEntity, buildRestQueryParams, CrudPayload, QueryParams } from '../../../shared';

/**
 * This is the base class for all CRUD services that use RESTful APIs.
 *
 * The abstract `entityRoute` property must be implemented in the derived class.
 * Example:
 * protected override entityRoute = '/api/albums';
 */
export abstract class BaseCrudRest<
  TEntity extends BaseEntity
> implements BaseCrud<TEntity> {
  protected abstract entityRoute: string;

  protected readonly http = inject(HttpClient);

  create(payload: CrudPayload<TEntity>) {
    return this.http.post<TEntity>(this.entityRoute, payload);
  }

  read(id: TEntity['id']) {
    return this.http.get<TEntity>(`${this.entityRoute}/${id}`);
  }

  readMany(params?: QueryParams<TEntity>) {
    return this.http.get<TEntity[]>(this.entityRoute, { params: buildRestQueryParams(params) });
  }

  update(id: TEntity['id'], payload: CrudPayload<TEntity>) {
    return this.http.patch<TEntity>(`${this.entityRoute}/${id}`, payload);
  }

  delete(id: TEntity['id']) {
    return this.http.delete<void>(`${this.entityRoute}/${id}`);
  }
}
