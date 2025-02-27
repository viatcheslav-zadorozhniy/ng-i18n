import { BaseEntity } from '../../base-entity';

export type JsonApiResource<TEntity extends BaseEntity> = {
  type: string;
  id: string;
  attributes: Omit<TEntity, 'id'>;
};

export type JsonApiSingleResponse<TEntity extends BaseEntity> = {
  data: JsonApiResource<TEntity>;
};

export type JsonApiListResponse<TEntity extends BaseEntity> = {
  data: JsonApiResource<TEntity>[];
  meta?: { total: number };
};

export type JsonApiPayload<Attributes> = {
  data: {
    type: string;
    attributes: Attributes;
  };
};

export type JsonApiUpdatePayload<Attributes> = {
  data: {
    id: string;
    type: string;
    attributes: Attributes;
  };
};
