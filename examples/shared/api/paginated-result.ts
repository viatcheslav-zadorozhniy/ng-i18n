export type PaginatedResult<TEntity> = {
  items: TEntity[];
  total: number;
};
