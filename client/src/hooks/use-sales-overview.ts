import React from "react";
import { useTheme } from "@mui/material";
import { Serie } from "@nivo/line";

import { ISales } from "@/types";

export const useSalesOverview = (data?: ISales) => {
  const theme = useTheme();

  const [totalSalesLine, totalUnitsLine] = React.useMemo(() => {
    if (!data) return [];

    const { monthlyData } = data;
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
  }, [data]);

  return { totalSalesLine, totalUnitsLine };
};
