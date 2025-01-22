"use client";

import * as React from "react";

// import { TeamSwitcher } from "@/app/dashboard/components/sidebar/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { sidebarItems } from "@/navigation/sidebar/sidebarItems";

import SidebarNavigation from "./sidebarNavigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar  >
      <SidebarHeader>{/* <TeamSwitcher teams={teams} /> */}</SidebarHeader>
      <SidebarContent>
        <SidebarNavigation sidebarItems={sidebarItems} />
        {/* <SidebarProjects projects={projects} /> */}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
