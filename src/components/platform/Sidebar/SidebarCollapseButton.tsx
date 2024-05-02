import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/stores/sidebar.store";
import { SidebarClose, SidebarOpen } from "lucide-react";

export const SidebarCollapseButton = () => {
  const isOpen = useSidebar((state) => state.isOpen);
  const toggle = useSidebar((state) => state.toggle);

  const handleToggle = () => {
    toggle();
  };

  return (
    <Button
      variant="ghost"
      onClick={handleToggle}
      className={cn("h-auto w-auto px-3 py-3")}
    >
      {isOpen ? (
        <SidebarClose size={24} />
      ) : (
        <SidebarOpen size={24} />
      )}
    </Button>
  );
};
