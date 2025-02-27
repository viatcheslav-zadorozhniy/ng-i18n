import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { BaseCrud } from '../base-crud.ng';
import {
  API_CONFIG,
  BaseEntity,
  BaseViewModel,
  buildJsonApiQueryParams,
  CrudPayload,
  JsonApiListResponse,
  JsonApiPayload,
  JsonApiSingleResponse,
  JsonApiUpdatePayload,
  PaginatedResult,
  QueryParams
} from '../../../shared';

export abstract class BaseCrudJsonApi<
  TEntity extends BaseEntity,
  TViewModel extends BaseViewModel<TEntity>
> implements BaseCrud<TEntity, TViewModel> {
  protected abstract entityRoute: string;
  protected abstract entityType: string;
  protected abstract entityViewModel: new (entity: TEntity) => TViewModel;

  protected readonly http = inject(HttpClient);
  protected readonly apiConfig = inject(API_CONFIG);
  protected readonly apiVersion = this.apiConfig.version;

  protected get entityUrl() {
    return `${this.apiConfig.url}/${this.apiVersion}/${this.entityRoute}`;
  }

  create(payload: CrudPayload<TEntity>) {
    const body: JsonApiPayload<CrudPayload<TEntity>> = {
      data: {
        attributes: payload,
        type: this.entityType
      }
    };

    return this.http
      .post<JsonApiSingleResponse<TEntity>>(this.entityUrl, body)
      .pipe(map(response => {
        const dto = { id: response.data.id, ...response.data.attributes } as TEntity;
        return this.createEntityViewModel(dto);
      }));
  }

  read(id: TEntity['id']) {
    return this.http
      .get<JsonApiSingleResponse<TEntity>>(`${this.entityUrl}/${id}`)
      .pipe(map(response => {
        const dto = { id: response.data.id, ...response.data.attributes } as TEntity;
        return this.createEntityViewModel(dto);
      }));
  }

  readMany(params?: QueryParams<TEntity>) {
    return this.http
      .get<JsonApiListResponse<TEntity>>(this.entityUrl, { params: buildJsonApiQueryParams(params) })
      .pipe(map(response => {
        const items = response.data.map(resource => {
          const dto = { id: resource.id, ...resource.attributes } as TEntity;
          return this.createEntityViewModel(dto);
        });
        const total = response.meta?.total ?? items.length;
        const paginatedResult: PaginatedResult<TViewModel> = { items, total };

        return paginatedResult;
      }));
  }

  update(id: TEntity['id'], payload: CrudPayload<TEntity>) {
    const body: JsonApiUpdatePayload<CrudPayload<TEntity>> = {
      data: {
        id,
        attributes: payload,
        type: this.entityType
      }
    };

    return this.http
      .patch<JsonApiSingleResponse<TEntity>>(`${this.entityUrl}/${id}`, body)
      .pipe(map(response => {
        const dto = { id: response.data.id, ...response.data.attributes } as TEntity;
        return this.createEntityViewModel(dto);
      }));
  }

  delete(id: TEntity['id']) {
    return this.http.delete<void>(`${this.entityUrl}/${id}`);
  }

  protected createEntityViewModel(entity: TEntity) {
    return new this.entityViewModel(entity);
  }
}
