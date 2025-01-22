import { DashboardIcon } from "@radix-ui/react-icons";
import {
  File,
  PanelsTopLeft,
  User,
  Briefcase,
  Globe,
  Check,
  LogOut,
  Settings,
  Logs,
  Lock,
  LucideIcon,
  LayoutDashboard,
  Users,
  UserSquareIcon,
  User2,
  DollarSign, 
  TrendingUp, 
  ArrowUpRight,
  TrendingDown
} from "lucide-react";

export interface NavMainItem {
  title: string;
  path: string;
  icon?: LucideIcon;
  isActive?: boolean;
}

export interface NavGroup {
  id: number;
  label: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 2,
    label: "Agency Management App",
    items: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard, // Matches "Dashboard"
        isActive: true,
      },
      {
        title: "Users",
        path: "/users",
        icon: UserSquareIcon, // Matches "Employees"
      },
      {
        title: "Partners",
        path: "/partners",
        icon: Users, // Matches "Partners"
      },
      {
        title: "Candidates",
        path: "/candidates",
        icon: User2, // Matches "Candidates"
      },
      {
        title: "CV",
        path: "/candidates/cv",
        icon: File, // Matches "CV"
      },
      {
        title: "Income",
        path: "/income",
        icon: TrendingUp, // Matches "Employees"
      },
      {
        title: "Expense",
        path: "/expense",
        icon: TrendingDown, // Matches "Employees"
      },
   
      {
        title: "Travel Agents",
        path: "/travel-agents",
        icon: Globe, // Matches "Travel Agents"
      },
      // {
      //   title: "Tickets",
      //   path: "/tickets",
      //   icon: Ticket, // Matches "Tickets"
      // },
      // {
      //   title: "Login Audit",
      //   path: "/loginaudit",
      //   icon: Check, // Matches "Login Audit"
      // },
      {
        title: "Settings",
        path: "/settings",
        icon: Settings, // Matches "Settings"
      },
      // {
      //   title: "Change Password",
      //   path: "/change-password",
      //   icon: Lock, // Matches "Change Password"
      // },
      // {
      //   title: "Activity Log",
      //   path: "/activitylog",
      //   icon: Logs, // Matches "Activity Log"
      // },
      {
        title: "Logout",
        path: "/logout",
        icon: LogOut, // Matches "Logout"
      },
    ],
  },
];
