import { limit, orderBy, QueryConstraint, where } from '@angular/fire/firestore';

import { BaseEntity } from '../../base-entity';
import { QueryParams } from '../query-params';

export const buildFirestoreQueryParams = <TEntity extends BaseEntity>(params?: QueryParams<TEntity>) => {
  const queryConstraints: QueryConstraint[] = [];

  if (params?.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      if (value !== undefined) {
        queryConstraints.push(where(key, '==', value));
      }
    });
  }

  if (params?.sort) {
    queryConstraints.push(orderBy(String(params.sort.field), params.sort.direction));
  }

  if (params?.pagination) {
    // Note: For proper pagination, you'd also use startAfter() or similar methods.
    queryConstraints.push(limit(params.pagination.size));
  }

  return queryConstraints;
};
