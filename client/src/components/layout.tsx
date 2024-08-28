import React from "react";
import { Outlet } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";

import { Navbar, Sidebar } from "@/components";
import { useAppSelector } from "@/states";

export const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        isNonMobile={isNonMobile}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        drawerWidth="250px"
      />
      <Box>
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        {/* Outlet will render element/component of route */}
        <Outlet />
      </Box>
    </Box>
  );
};
