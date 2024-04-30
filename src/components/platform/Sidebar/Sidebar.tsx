import { cn } from "@/lib/utils";
import { SidebarContent } from "./SidebarContent";
import { SidebarHeader } from "./SidebarHeader";
import { useSidebar } from "@/stores/sidebar.store";
import { motion } from "framer-motion";

const variants = {
  open: { width: "256px" },
  closed: { width: "80.8px"},
};

export const Sidebar = () => {
  const isOpen = useSidebar((state) => state.isOpen);

  return (
    <motion.aside
      initial={isOpen ? "open" : "closed"}
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      className={cn(
        "top-14 z-30 h-[calc(100vh-56px)] hidden md:flex md:flex-col md:gap-4 md:sticky shrink-0 border-r border-border py-6 px-4 overflow-y-auto overflow-x-hidden",
      )}
    >
      <SidebarHeader />
      <SidebarContent />
    </motion.aside>
  );
};
