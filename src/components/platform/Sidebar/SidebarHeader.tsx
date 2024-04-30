import { cn } from "@/lib/utils";
import { useSidebar } from "@/stores/sidebar.store";
import { SidebarCollapseButton } from "./SidebarCollapseButton";
import { motion } from "framer-motion";

const variants = {
  open: { opacity: 1, transition: { duration: 0.6 } },
  closed: { opacity: 0 },
};

export const SidebarHeader = () => {
  const isOpen = useSidebar((state) => state.isOpen);

  return (
    <div
      className={cn(
        "flex items-center w-full",
        isOpen ? "justify-between" : "justify-end"
      )}
    >
      <motion.p
        className={cn("text-xl font-bold block", !isOpen && "hidden")}
        animate={isOpen ? "open" : "closed"}
        variants={variants}
      >
        Menú
      </motion.p>
      <SidebarCollapseButton />
    </div>
  );
};
