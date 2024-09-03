import React from "react";
import {
  FormControl,
  MenuItem,
  InputLabel,
  Box,
  Select,
  useTheme,
} from "@mui/material";
import { Serie } from "@nivo/line";

import { Header, OverviewChart } from "@/components";
import { useGetSalesQuery } from "@/states/api";

type TView = "sales" | "units";

export default function SalesOverview() {
  const theme = useTheme();
  const [view, setView] = React.useState<TView>("units");

  const { data: result, isLoading } = useGetSalesQuery();

  const [totalSalesLine, totalUnitsLine] = React.useMemo(() => {
    if (!result) return [];

    const { monthlyData } = result.data;
    const _totalSalesLine: Serie = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    };
    const _totalUnitsLine: Serie = {
      id: "totalUnits",
      color: `${theme.palette.secondary[600]}`,
      data: [],
    };

    Object.values(monthlyData).reduce(
      (acc, currentData) => {
        const { month, totalSales, totalUnits } = currentData;

        const currentSales = acc.sales + totalSales;
        const currentUnits = acc.units + totalUnits;

        _totalSalesLine.data = [
          ..._totalSalesLine.data,
          { x: month, y: currentSales },
        ];
        _totalUnitsLine.data = [
          ..._totalUnitsLine.data,
          { x: month, y: currentUnits },
        ];

        return { sales: currentSales, units: currentUnits };
      },
      { sales: 0, units: 0 } as { sales: number; units: number }
    );

    return [[_totalSalesLine], [_totalUnitsLine]];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

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
