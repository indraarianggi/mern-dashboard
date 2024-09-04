import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";

import { DataGridCustomToolbar, Header } from "@/components";
import { useGetTransactionsQuery } from "@/states/api";
import { ISortParams } from "@/types";

export default function Transactions() {
  const theme = useTheme();

  // value to be sent as query params
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 20,
  });
  const [sort, setSort] = React.useState<ISortParams>();
  const [search, setSearch] = React.useState("");
  const [searchInput, setSearchInput] = React.useState("");

  const { data: result, isLoading } = useGetTransactionsQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  const handleSortModelChange = React.useCallback(
    (sortModel: GridSortModel) => {
      setSort(sortModel[0]);
    },
    []
  );

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-vitualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading}
          getRowId={(row) => row._id}
          rows={(result && result.data.items) || []}
          columns={columns}
          rowCount={(result && result.data.total) || 0}
          pagination
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[20, 50, 100]}
          sortingMode="server"
          sortModel={sort ? [sort] : []}
          onSortModelChange={handleSortModelChange}
          slots={{
            toolbar: DataGridCustomToolbar,
          }}
          /**
           * passing props into DataGridCustomToolbar component
           *
           * reference: https://mui.com/x/react-data-grid/components/#custom-slot-props-with-typescript
           */
          slotProps={{
            toolbar: {
              searchInput,
              setSearchInput,
              setSearch,
            },
          }}
        />
      </Box>
    </Box>
  );
}
