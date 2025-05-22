"use client";

import { useState } from "react";
import {
  Dashboard as DashboardIcon,
  People,
  ShoppingCart,
  BarChart,
} from "@mui/icons-material";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  ListItemButton,
} from "@mui/material";

const drawerWidth = 240;

const navItems = [
  { text: "Home", icon: <DashboardIcon /> },
  { text: "Customers", icon: <People /> },
  { text: "Orders", icon: <ShoppingCart /> },
  { text: "Sales", icon: <BarChart /> },
];

const DashboardCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) => (
  <div className={`bg-${color}-100 rounded-lg p-4 shadow-sm`}>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

export default function Dashboard() {
  const [selected, setSelected] = useState("Home");

  return (
    <Box className="flex">
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Restaurant Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={selected === item.text}
                onClick={() => setSelected(item.text)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: "#f9fafb", minHeight: "100vh" }}
      >
        <Toolbar />
        {selected === "Home" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <DashboardCard title="Total Orders" value="1,245" color="blue" />
              <DashboardCard
                title="Total Sales"
                value="$32,540"
                color="green"
              />
              <DashboardCard title="Visitors" value="8,932" color="purple" />
              <DashboardCard title="Return Rate" value="12%" color="red" />
            </div>
          </div>
        )}
        {selected === "Customers" && (
          <div>Customer management coming soon...</div>
        )}
        {selected === "Orders" && <div>Orders page under construction...</div>}
        {selected === "Sales" && <div>Sales analytics loading...</div>}
      </Box>
    </Box>
  );
}
