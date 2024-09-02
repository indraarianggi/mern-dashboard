import React from "react";
import { Outlet } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";

import { Navbar, Sidebar } from "@/components";
import { useAppSelector } from "@/states";
import { useGetUserQuery } from "@/states/api";

export const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const userId = useAppSelector((state) => state.global.userId);
  const { data: userData } = useGetUserQuery(userId);
  console.log(userData);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={userData?.data}
        isNonMobile={isNonMobile}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        drawerWidth="250px"
      />
      <Box flexGrow={1}>
        <Navbar
          user={userData?.data}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        {/* Outlet will render element/component of route */}
        <Outlet />
      </Box>
    </Box>
  );
};
