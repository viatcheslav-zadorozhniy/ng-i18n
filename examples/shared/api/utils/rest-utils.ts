import { HttpParams } from '@angular/common/http';

import { BaseEntity } from '../../base-entity';
import { QueryParams } from '../query-params';

export const buildRestQueryParams = <TEntity extends BaseEntity>(params?: QueryParams<TEntity>) => {
  let httpParams = new HttpParams();

  if (!params) {
    return httpParams;
  }

  if (params.pagination) {
    httpParams = httpParams.set('_page', params.pagination.number);
    httpParams = httpParams.set('_limit', params.pagination.size);
  }

  if (params.sort) {
    httpParams = httpParams.set('_sort', String(params.sort.field));
    httpParams = httpParams.set('_order', params.sort.direction);
  }

  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      if (value !== undefined) {
        httpParams = httpParams.set(key, String(value));
      }
    });
  }

  return httpParams;
};
