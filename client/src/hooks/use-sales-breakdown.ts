import React from "react";
import { useTheme } from "@mui/material";

export const useSalesBreakdown = (data?: object) => {
  const theme = useTheme();

  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.secondary[300],
    theme.palette.secondary[500],
  ];

  const formattedData = React.useMemo(() => {
    return Object.entries(data ?? {}).map(([category, sales], i) => ({
      id: category,
      label: category,
      value: sales as number,
      color: colors[i],
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return formattedData;
};
