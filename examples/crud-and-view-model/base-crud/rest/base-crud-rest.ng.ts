import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { map } from 'rxjs';

import { BaseCrud } from '../base-crud.ng';
import {
  API_CONFIG,
  BaseEntity,
  BaseViewModel,
  buildRestQueryParams,
  CrudPayload,
  PaginatedResult,
  QueryParams
} from '../../../shared';

/**
 * This is the base class for all CRUD services that use RESTful APIs.
 *
 * The abstract `entityRoute` property must be implemented in the derived class.
 * Example:
 * protected override entityRoute = '/api/users';
 */
export abstract class BaseCrudRest<
  TEntity extends BaseEntity,
  TViewModel extends BaseViewModel<TEntity>
> implements BaseCrud<TEntity, TViewModel> {
  /**
   * Concrete classes must specify:
   * - The REST endpoint (`entityRoute`).
   * - The view model constructor to transform DTOs (`entityViewModel`).
   */
  protected abstract entityRoute: string;
  protected abstract entityViewModel: new (entity: TEntity) => TViewModel;

  protected readonly http = inject(HttpClient);
  protected readonly apiConfig = inject(API_CONFIG);
  protected readonly apiVersion = this.apiConfig.version;

  protected get entityUrl() {
    return `${this.apiConfig.url}/${this.apiVersion}/${this.entityRoute}`;
  }

  create(payload: CrudPayload<TEntity>) {
    return this.http
      .post<TEntity>(this.entityUrl, payload)
      .pipe(map(entity => this.createEntityViewModel(entity)));
  }

  read(id: TEntity['id']) {
    return this.http
      .get<TEntity>(`${this.entityUrl}/${id}`)
      .pipe(map(entity => this.createEntityViewModel(entity)));
  }

  readMany(params?: QueryParams<TEntity>) {
    return this.http
      .get<TEntity[]>(this.entityUrl, { params: buildRestQueryParams(params), observe: 'response' })
      .pipe(
        map(response => {
          const items = (response.body || []).map(dto => this.createEntityViewModel(dto));

          /**
           * The `X-Total-Count` header is a common convention in REST APIs.
           * It indicates the total number of items in the collection.
           * If the header is not present, we assume that the total is the number of items in the response body.
           */
          const totalHeader = response.headers.get('X-Total-Count');
          const total = totalHeader ? parseInt(totalHeader, 10) : items.length;
          const paginatedResult: PaginatedResult<TViewModel> = { items, total };

          return paginatedResult;
        })
      );
  }

  update(id: TEntity['id'], payload: CrudPayload<TEntity>) {
    return this.http
      .patch<TEntity>(`${this.entityUrl}/${id}`, payload)
      .pipe(map(entity => this.createEntityViewModel(entity)));
  }

  delete(id: TEntity['id']) {
    return this.http.delete<void>(`${this.entityUrl}/${id}`);
  }

  protected createEntityViewModel(entity: TEntity) {
    return new this.entityViewModel(entity);
  }
}
