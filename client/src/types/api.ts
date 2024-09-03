import { GridSortItem } from "@mui/x-data-grid";

export interface IResponse<T> {
  data: T;
  message: string;
}

export interface IResponseWithPagination<T> {
  data: {
    items: T[];
    total: number;
    page: number;
    totalPage: number;
  };
  message: string;
}

export interface IGetTransactionsParams {
  page?: number;
  pageSize?: number;
  sort?: string; // stringify of object ISortParams, example: { "field": "userId", "sort": "asc" }
  search?: string;
}

export type ISortParams = GridSortItem;
