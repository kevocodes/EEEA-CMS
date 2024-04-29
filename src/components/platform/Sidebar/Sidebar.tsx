import { cn } from "@/lib/utils";
import { SidebarContent } from "./SidebarContent";
import { SidebarHeader } from "./SidebarHeader";
import { useSidebar } from "@/stores/sidebar.store";

export const Sidebar = () => {
  const isOpen = useSidebar((state) => state.isOpen);

  return (
    <aside
      className={cn(
        "top-14 z-30 h-[calc(100vh-56px)] max-w-64 hidden lg:flex lg:flex-col lg:gap-4 lg:sticky shrink-0 border-r border-border py-6 px-4 overflow-y-auto items-start transition-all duration-300",
        isOpen ? "w-full" : "",
      )}
    >
      <SidebarHeader />
      <SidebarContent />
    </aside>
  );
};
