import { Box } from "@mui/material";

import { BreakdownChart, Header } from "@/components";
import { useGetSalesQuery } from "@/states/api";
import { useSalesBreakdown } from "@/hooks";

export default function Breakdown() {
  const { data: result, isLoading } = useGetSalesQuery();

  const formattedData = useSalesBreakdown(result?.data.salesByCategory);

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
