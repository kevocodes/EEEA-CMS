import { SidebarItem, SidebarItemLogout } from "./SidebarItem";
import { Icon } from "@iconify/react/dist/iconify.js";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { useSidebar } from "@/stores/sidebar.store";

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
        to={PRIVATE_ROUTES.HOME}
        isSidebarOpen={isSidebarOpen}
      >
        <Icon
          width={24}
          height={24}
          icon="material-symbols:laptop-chromebook-outline"
        />
      </SidebarItem>

      <SidebarItemLogout label="Cerrar sesión" isSidebarOpen={isSidebarOpen}>
        <Icon width={24} height={24} icon="material-symbols:logout" />
      </SidebarItemLogout>
    </>
  );
};
