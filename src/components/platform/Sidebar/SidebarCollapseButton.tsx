import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/stores/sidebar.store";
import { Icon } from "@iconify/react/dist/iconify.js";

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
      className={cn("h-auto w-auto px-3 py-3", isOpen && "p-3")}
    >
      {isOpen ? (
        <Icon icon="lucide:panel-left-close" fontSize={24} />
      ) : (
        <Icon icon="lucide:panel-left-open" fontSize={24} />
      )}
    </Button>
  );
};
