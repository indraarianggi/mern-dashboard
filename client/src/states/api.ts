import {
  IGeography,
  IGetTransactionsParams,
  IProductWithStat,
  IResponse,
  IResponseWithPagination,
  ISales,
  ITransaction,
  IUser,
} from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  reducerPath: "adminAPi",
  tagTypes: [
    "User",
    "Product",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
  ],
  endpoints: (build) => ({
    getUser: build.query<IResponse<IUser>, string>({
      query: (id) => `general/users/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query<IResponse<IProductWithStat[]>, void>({
      query: () => "client/products",
      providesTags: ["Product"],
    }),
    getCustomers: build.query<IResponse<IUser[]>, void>({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query<
      IResponseWithPagination<ITransaction>,
      IGetTransactionsParams
    >({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query<IResponse<IGeography[]>, void>({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query<IResponse<ISales>, void>({
      query: () => "sales",
      providesTags: ["Sales"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
} = api;
