import React from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import { Search } from "@mui/icons-material";

import { FlexBetween } from "./flex-between";

/**
 * setup type of IDataGridCustomToolbarProps
 *
 * reference: https://mui.com/x/react-data-grid/components/#custom-slot-props-with-typescript
 */
interface IDataGridCustomToolbarProps {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const DataGridCustomToolbar = ({
  searchInput,
  setSearchInput,
  setSearch,
}: IDataGridCustomToolbarProps) => {
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <TextField
          label="Search..."
          sx={{ mb: "0.5rem", width: "15rem" }}
          variant="standard"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setSearch(searchInput);
                      setSearchInput("");
                    }}
                  >
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
};
