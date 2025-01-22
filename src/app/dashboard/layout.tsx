"use client"

import React, { ReactNode, useEffect } from "react"

import { AppSidebar } from "@/components/sidebar/app-sidebar"
 import Cookies from "js-cookie"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
 import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { logoutRequest, resetloginState } from "@/lib/reducers/authreducer"
import { useToast } from "@/hooks/use-toast"
interface LayoutProps {
  readonly children: ReactNode
}

export default function MasterLaout({ children }: LayoutProps) {
  const dispatch=useAppDispatch();
  const status=useAppSelector((state)=>state.auth.status);
  const error=useAppSelector((state)=>state.auth.error);
const {toast}=useToast();
const handlelogout=(()=>{
  dispatch(logoutRequest())
  // Cookies.remove('user');
  // Cookies.remove('token');
  
})

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
  return (
    <main>
      <SidebarProvider>
        <AppSidebar />  
        <SidebarInset className="mx-auto max-w-screen-2xl">
          <header className="flex h-16 items-center justify-between px-4 shadow-md">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
             
            </div>
            {/* Left section: Sidebar Trigger and Breadcrumb */}

            {/* Right section: Avatar dropdown */}
            <div className="flex space-x-2">
            <ThemeSwitcher/>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src="https://via.placeholder.com/40" alt="User Avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => alert("Go to Profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => alert("Go to Settings")}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() =>handlelogout()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          </header>
          <div className="p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  )
}
