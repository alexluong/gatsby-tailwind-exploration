import { createContext } from "react";

interface SidebarState {
  isMobile: boolean;
  sidebarWidth: number;
  isOpen: boolean;
  toggleSidebar: () => void;
  style: any;
  dragSidebar: any;
}

export const Context = createContext<Partial<SidebarState>>({});
