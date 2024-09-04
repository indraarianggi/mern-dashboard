import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";

import {
  BreakdownChart,
  FlexBetween,
  Header,
  OverviewChart,
  StatBox,
} from "@/components";
import { useSalesBreakdown, useSalesOverview } from "@/hooks";
import { useGetDashboardStatsQuery, useGetSalesQuery } from "@/states/api";

export default function DashboardPage() {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const { data: dashboardData, isLoading: isLoadingDashboard } =
    useGetDashboardStatsQuery();

  const { data: salesData, isLoading: isLoadingSales } = useGetSalesQuery();
  const { totalSalesLine, totalUnitsLine } = useSalesOverview(salesData?.data);
  const salesBreakdown = useSalesBreakdown(salesData?.data.salesByCategory);

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

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": {
            gridColumn: isNonMediumScreens ? undefined : "span 12",
          },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Customers"
          value={(dashboardData && dashboardData.data.totalCustomers) || 0}
          increase="+14%"
          description="Since last month"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Sales Today"
          value={
            (dashboardData && dashboardData.data.todayStats.totalSales) || 0
          }
          increase="+21%"
          description="Since last month"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          p="1rem"
          borderRadius="0.55rem"
          sx={{ backgroundColor: theme.palette.background.alt }}
        >
          {!salesData && isLoadingSales ? (
            <>Loading...</>
          ) : (
            <OverviewChart
              view="sales"
              isDashboard={true}
              totalSalesLine={totalSalesLine ?? []}
              totalUnitsLine={totalUnitsLine ?? []}
            />
          )}
        </Box>
        <StatBox
          title="Monthly Sales"
          value={
            (dashboardData && dashboardData.data.thisMonthStats.totalSales) || 0
          }
          increase="+5%"
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Yearly Sales"
          value={(dashboardData && dashboardData.data.yearlySalesTotal) || 0}
          increase="+43%"
          description="Since last month"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
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
              backgroundColor: theme.palette.background.alt,
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
            loading={isLoadingDashboard}
            getRowId={(row) => row._id}
            rows={(dashboardData && dashboardData.data.transactions) || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          p="1.5rem"
          borderRadius="0.55rem"
          sx={{
            backgroundColor: theme.palette.background.alt,
          }}
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
          <BreakdownChart
            isDashboard={true}
            data={salesBreakdown}
            yearlySalesTotal={salesData?.data.yearlySalesTotal ?? 0}
          />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
