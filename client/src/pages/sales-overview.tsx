import React from "react";
import { FormControl, MenuItem, InputLabel, Box, Select } from "@mui/material";

import { Header, OverviewChart } from "@/components";
import { useGetSalesQuery } from "@/states/api";
import { useSalesOverview } from "@/hooks";

type TView = "sales" | "units";

export default function SalesOverview() {
  const [view, setView] = React.useState<TView>("units");

  const { data: result, isLoading } = useGetSalesQuery();

  const { totalSalesLine, totalUnitsLine } = useSalesOverview(result?.data);

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="OVERVIEW"
        subtitle="Overview of general revenue and profit"
      />
      <Box mt="40px" height="75vh">
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value as TView)}
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>

        {!result && isLoading ? (
          <>Loading...</>
        ) : (
          <OverviewChart
            view={view}
            totalSalesLine={totalSalesLine ?? []}
            totalUnitsLine={totalUnitsLine ?? []}
          />
        )}
      </Box>
    </Box>
  );
}
