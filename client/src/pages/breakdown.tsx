import { Box, useTheme } from "@mui/material";

import { BreakdownChart, Header } from "@/components";
import { useGetSalesQuery } from "@/states/api";

export default function Breakdown() {
  const theme = useTheme();

  const { data: result, isLoading } = useGetSalesQuery();

  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.secondary[300],
    theme.palette.secondary[500],
  ];

  const formattedData = Object.entries(result?.data.salesByCategory ?? {}).map(
    ([category, sales], i) => ({
      id: category,
      label: category,
      value: sales as number,
      color: colors[i],
    })
  );

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="BREAKDOWN" subtitle="Breakdown of sales by category" />
      <Box mt="40px" height="75vh">
        {!result && isLoading ? (
          <>Loading...</>
        ) : (
          <BreakdownChart
            data={formattedData}
            yearlySalesTotal={result?.data.yearlySalesTotal ?? 0}
          />
        )}
      </Box>
    </Box>
  );
}
