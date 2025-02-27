import { HttpParams } from '@angular/common/http';

import { BaseEntity } from '../../base-entity';
import { QueryParams } from '../query-params';

export const buildJsonApiQueryParams = <TEntity extends BaseEntity>(params?: QueryParams<TEntity>) => {
  let httpParams = new HttpParams();

  if (!params) {
    return httpParams;
  }

  if (params.pagination) {
    httpParams = httpParams.set('page[number]', params.pagination.number);
    httpParams = httpParams.set('page[size]', params.pagination.size);
  }

  if (params.sort) {
    const sortField = params.sort.direction === 'desc' ? `-${String(params.sort.field)}` : String(params.sort.field);
    httpParams = httpParams.set('sort', sortField);
  }

  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      if (value !== undefined) {
        httpParams = httpParams.set(`filter[${key}]`, String(value));
      }
    });
  }
  return httpParams;
};
