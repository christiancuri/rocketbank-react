export type PaginationState = {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  gotoPage(_page: number): void;
};
