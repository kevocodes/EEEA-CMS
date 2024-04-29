import { SidebarItem, SidebarItemLogout } from "./SidebarItem";
import { Icon } from "@iconify/react/dist/iconify.js";
import { PRIVATE_ROUTES } from "@/constants/routes";

export const SidebarContent = () => {
  return (
    <>
      <SidebarItem label="Eventos" to={PRIVATE_ROUTES.HOME}>
        <Icon
          width={24}
          height={24}
          icon="material-symbols:laptop-chromebook-outline"
        />
      </SidebarItem>

      <SidebarItemLogout label="Cerrar sesión">
        <Icon width={24} height={24} icon="material-symbols:logout" />
      </SidebarItemLogout>
    </>
  );
};
