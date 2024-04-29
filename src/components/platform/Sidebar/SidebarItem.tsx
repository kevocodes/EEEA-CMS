import { cn } from "@/lib/utils";
import { useAuth } from "@/stores/auth.store";
import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
  children?: React.ReactNode;
  label: string;
  to: string;
}

export const SidebarItem = ({ label, children, to }: SidebarItemProps) => {
  const pathname = useLocation().pathname;
  const isActive = pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "px-3 py-3 rounded-md flex gap-3 items-center transition-all duration-300 w-full",
        isActive && "bg-primary text-primary-foreground",
        !isActive && "hover:bg-muted"
      )}
    >
      {children}
      <p>{label}</p>
    </Link>
  );
};

export const SidebarItemLogout = ({
  label,
  children,
}: Omit<SidebarItemProps, "to">) => {
  const logout = useAuth((state) => state.logout);

  return (
    <button
      onClick={() => logout()}
      className="px-3 py-3 rounded-md flex gap-3 items-center hover:bg-muted w-full"
    >
      {children}
      <p> {label}</p>
    </button>
  );
};
