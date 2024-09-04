import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import { Layout } from "@/components";
import {
  AdminPage,
  BreakdownPage,
  CustomersPage,
  DailyPage,
  DashboardPage,
  GeographyPage,
  MonthlyPage,
  PerformancePage,
  ProductsPage,
  SalesOverviewPage,
  TransactionsPage,
} from "@/pages";
import { useAppSelector } from "@/states";
import { themeSettings } from "@/themes";

function App() {
  const mode = useAppSelector((state) => state.global.mode);

  const theme = React.useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/geography" element={<GeographyPage />} />
              <Route path="/overview" element={<SalesOverviewPage />} />
              <Route path="/daily" element={<DailyPage />} />
              <Route path="/monthly" element={<MonthlyPage />} />
              <Route path="/breakdown" element={<BreakdownPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/performance" element={<PerformancePage />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
