export interface IPagination<T> {
  totalPages: number;
  totalElements: number;
  pageable: IPageable;
  first: boolean;
  last: boolean;
  size: number;
  content: T[];
  number: number;
  sort: ISort;
  numberOfElements: number;
  empty: boolean;
}

export interface IPageable {
  pageNumber: number;
  pageSize: number;
  sort: ISort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface ISort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}
