import React from "react";

/**
 * augment the props for the toolbar slot (for DataGridCustomToolbar component)
 *
 * reference: https://mui.com/x/react-data-grid/components/#custom-slot-props-with-typescript
 */
declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
  }
}
