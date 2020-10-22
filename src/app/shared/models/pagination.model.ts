export interface Pagination {
  currentPage?: number;
  pageSize?: number;
  totalPages?: number;
  totalCount: number;
}

export class PaginatedData<T> {
  public data: T;
  public meta: Pagination;
}
