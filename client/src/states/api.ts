import { IProductWithStat, IResponse, IUser } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  reducerPath: "adminAPi",
  tagTypes: ["User", "Product", "Customers"],
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
  }),
});

export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery } =
  api;
