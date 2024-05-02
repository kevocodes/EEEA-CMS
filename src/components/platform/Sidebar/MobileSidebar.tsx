import { Button } from "@/components/ui/button";
import { SheetContent, Sheet } from "@/components/ui/sheet";
import { SidebarContent } from "./SidebarContent";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

export const MobileSidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useEffect(
    function CloseOnRouteChange() {
      close();
    },
    [location.pathname]
  );

  return (
    <>
      <Button
        size="icon"
        className="flex md:hidden text-center"
        variant="outline"
        onClick={open}
      >
        <Menu size={20} className="text-foreground" />
      </Button>
      <Sheet open={isOpen} onOpenChange={close}>
        <SheetContent
          side="left"
          className="pt-12 flex flex-col gap-4 overflow-auto w-[85%] sm:w-3/4"
        >
          <p className="text-2xl font-bold block">Menú</p>
          <SidebarContent isMobile />
        </SheetContent>
      </Sheet>
    </>
  );
};
