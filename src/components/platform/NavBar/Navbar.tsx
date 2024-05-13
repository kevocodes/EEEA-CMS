import { useAuth } from "@/stores/auth.store";
import { MobileSidebar } from "../Sidebar/MobileSidebar";

export function NavBar() {
  const user = useAuth((state) => state.user);

  return (
    <header className="h-14 py-2 px-5 border-b flex justify-between items-center sticky top-0 z-50 bg-background/60 backdrop-blur-sm backdrop-filter">
      <MobileSidebar />

      <div className="gap-2 items-center  hidden sm:flex">
        <img src="/logo.webp" alt="Logo" className="h-8" />
        <h1 className="font-bold">EEE Ahuachapán</h1>
      </div>

      <p className="text-muted-foreground text-center text-sm font-bold">
        {user?.name} {user?.lastname}
      </p>
    </header>
  );
}
