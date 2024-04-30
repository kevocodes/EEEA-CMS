import { cn } from "@/lib/utils";
import { useAuth } from "@/stores/auth.store";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

interface SidebarItemProps {
  children?: React.ReactNode;
  label: string;
  to: string;
  isSidebarOpen?: boolean;
}

const variants = {
  open: { opacity: 1, transition: { duration: 0.6 } },
  closed: { opacity: 0 },
};

export const SidebarItem = ({
  label,
  children,
  to,
  isSidebarOpen,
}: SidebarItemProps) => {
  const pathname = useLocation().pathname;
  const isActive = pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "px-3 py-3 relative rounded-md flex gap-3 items-center w-full",
        isActive && "bg-primary text-primary-foreground",
        !isActive && "hover:bg-muted"
      )}
    >
      {children}

      <motion.p
        className="absolute left-12"
        animate={isSidebarOpen ? "open" : "closed"}
        variants={variants}
      >
        {label}
      </motion.p>
    </Link>
  );
};

export const SidebarItemLogout = ({
  label,
  children,
  isSidebarOpen,
}: Omit<SidebarItemProps, "to">) => {
  const logout = useAuth((state) => state.logout);

  return (
    <button
      onClick={() => logout()}
      className="px-3 relative py-3 rounded-md flex gap-3 items-center hover:bg-muted overflow-hidden"
    >
      {children}
      <motion.p
        className={cn("absolute left-12 truncate")}
        animate={isSidebarOpen ? "open" : "closed"}
        variants={variants}
      >
        {label}
      </motion.p>
    </button>
  );
};
