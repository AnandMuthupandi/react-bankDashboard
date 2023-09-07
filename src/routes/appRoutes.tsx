import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";
import Customers from "../pages/customers/Customers";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Dashboard from "../pages/dashboard/Dashboard";

const appRoutes: RouteType[] = [
  {
    index: true,
    path: "/",
    element: <HomePage />,
    state: "home",
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Dashboard",
      icon: <DashboardOutlinedIcon />,
    },
  },
  {
    path: "/customers",
    element: <Customers />,
    state: "customers",
    sidebarProps: {
      displayText: "Customers",
      icon: <PersonOutlineOutlinedIcon />,
    },
  },
];

export default appRoutes;
