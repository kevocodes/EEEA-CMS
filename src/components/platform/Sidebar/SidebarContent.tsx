import { SidebarItem, SidebarItemLogout } from "./SidebarItem";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { useSidebar } from "@/stores/sidebar.store";
import { Building, CalendarClock, LogOut, Notebook } from "lucide-react";

interface SidebarContentProps {
  isMobile?: boolean;
}

export const SidebarContent = ({ isMobile }: SidebarContentProps) => {
  const isOpen = useSidebar((state) => state.isOpen);
  const isSidebarOpen = !isMobile ? isOpen : true;

  return (
    <>
      <SidebarItem
        label="Eventos"
        to={PRIVATE_ROUTES.EVENTS}
        isSidebarOpen={isSidebarOpen}
        isIndexRoute
      >
        <CalendarClock size={24} />
      </SidebarItem>

      <SidebarItem
        label="Actividades"
        to={PRIVATE_ROUTES.ACTIVITIES}
        isSidebarOpen={isSidebarOpen}
      >
        <Notebook size={24} />
      </SidebarItem>

      <SidebarItem
        label="Instalaciones"
        to={PRIVATE_ROUTES.INSTALLATIONS}
        isSidebarOpen={isSidebarOpen}
      >
        <Building size={24} />
      </SidebarItem>


      <SidebarItemLogout label="Cerrar sesión" isSidebarOpen={isSidebarOpen}>
        <LogOut size={24} />
      </SidebarItemLogout>
    </>
  );
};
