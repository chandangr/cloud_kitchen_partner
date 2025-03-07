import { Calendar, Home, Inbox, Search, Settings, X } from "lucide-react";
import { useState } from 'react';
import './app-sidebar.css';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: Home,
  },
  {
    title: "Menu Items",
    url: "menu-item",
    icon: Inbox,
  },
  {
    title: "orders",
    url: "orders",
    icon: Calendar,
  },
  {
    title: "Website Builder",
    url: "website-builder",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Sidebar className={isCollapsed ? 'collapsed' : ''}>
      <button onClick={handleToggle} className="toggle-button">
        <X />
      </button>
      <SidebarContent className={isCollapsed ? 'collapsed-content' : ''}>
        <SidebarGroup>
          <SidebarGroupLabel>Cloud Kitchen Partner</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="menu-item">
                      <item.icon />
                      {!isCollapsed && <span>{item.title}</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar;
