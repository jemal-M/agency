"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import Image from "next/image";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavGroup } from "@/navigation/sidebar/sidebarItems";
import { LogoutDialog } from "../ui/LogoutModal";
import { logoutRequest } from "@/lib/reducers/authreducer";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useToast } from "@/hooks/use-toast";

export default function SidebarNavigation({
  sidebarItems,
}: {
  readonly sidebarItems: NavGroup[];
}) {
    const dispatch=useAppDispatch();
  
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [userRole,setuserRole]=useState('')
useEffect(()=>{

  const user = Cookies.get("user"); // Replace "userRole" with the actual cookie name
  if(user){
  const userData=JSON.parse(user)
  
  setuserRole(userData.role);
  }
},[userRole])
  // Get the user's role from cookies
  // Role-based filtering of sidebar items
  const filterSidebarItems = (items: NavGroup[]) => {
    if (userRole === "ADMIN") {
      // ADMIN: All items except "CV"
      return items.map((group) => ({
        ...group,
        items: group.items.filter((item) => item.title !== "CV"),
      }));
    } else if (userRole === "PARTNER") {
      // PARTNER: Only "Dashboard", "CV", "Settings", and "Logout"
      const allowedTitles = ["Dashboard", "CV", "Settings", "Logout"];
      return items.map((group) => ({
        ...group,
        items: group.items.filter((item) => allowedTitles.includes(item.title)),
      }));
    }
    return []; // If role is not recognized, return an empty array
  };

  // Apply filtering to the sidebar items
  const filteredSidebarItems = filterSidebarItems(sidebarItems);
 const status=useAppSelector((state)=>state.auth.status);
  const error=useAppSelector((state)=>state.auth.error);
const {toast}=useToast();

  useEffect(()=>{
    if(status==='Success'){
    
      toast({
        title: "Loged out Successfully!",
        description: error || "Unknown error occurred", // Ensure error is populated
        variant: "default", // Make the toast red for errors
      });
      window.location.href='/auth/login';
    }
    else if(status==='Failed'){
      toast({
        title: "Login failed",
        description: error || "Unknown error occurred", // Ensure error is populated
        variant: "destructive", // Make the toast red for errors
      });
    }
  },[status,error])
  const handleLogout = () => {
    dispatch(logoutRequest())

    // Trigger the logout logic here, e.g., clearing tokens, redirecting, etc.
    console.log("User logged out");
    setIsLogoutDialogOpen(false); // Close the dialog
  };

  return (
    <>
      <Image src="/images/logo.png" width={100} height={100} alt="logo" />
      {filteredSidebarItems.map((navGroup) => (
        <SidebarGroup key={navGroup.id}>
          {navGroup.label && <SidebarGroupLabel>{navGroup.label}</SidebarGroupLabel>}
          <SidebarMenu>
            {navGroup.items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  className="w-full p-6 hover:bg-gray-400 hover:text-black active:font-bold focus:text-black focus:bg-gray-400 active:bg-gray-400 active:text-black"
                  tooltip={item.title}
                  asChild
                >
                  {item.title.toLowerCase() === "logout" ? (
                    <button
                      onClick={() => setIsLogoutDialogOpen(true)}
                      className="flex w-full items-center gap-2 text-left"
                    >
                      {item.icon && <item.icon className="shrink-0" />}
                      <span>{item.title}</span>
                    </button>
                  ) : (
                    <Link href={item.path} className="flex w-full items-center gap-2">
                      {item.icon && <item.icon className="shrink-0" />}
                      <span>{item.title}</span>
                    </Link>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
      <LogoutDialog
        isOpen={isLogoutDialogOpen}
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutDialogOpen(false)}
      />
    </>
  );
}
