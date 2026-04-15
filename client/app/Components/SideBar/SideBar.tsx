"use client";

import { useUserContext } from '@/context/userContext';
import Profile from '../Profile/Profile';
import RadioChart from '../RadioChart/RadioChart';
import Button from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { useContext, useEffect } from 'react';
import { SideBarContext } from '@/providers/SideBarProvider';
import { usePathname } from "next/navigation";
import { logoutIcon } from '@/app/utils/icons';

function SideBar() {
  const pathname = usePathname();
  const { isOpen, setIsOpen } = useContext(SideBarContext);
  const { logoutUser } = useUserContext();

  useEffect(() => {
    if(window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  }, [isOpen]);

return (
    <>
      {/* For mobile view */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside 
        className={`
          fixed top-0 right-0 h-full w-[80%] max-w-[19rem] z-50 p-4 transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 md:static md:w-[18rem] overflow-y-auto
        `}
      >
      <Card className="h-full flex flex-col p-4 bg-background/90 opacity-95 shadow-sm hover:shadow-md transition border-border">

        {/* Top */}
        <div className="flex-1 space-y-6 overflow-y-auto">
          <Profile />

          <Separator />

          <div className="px-2">
            <RadioChart />
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-center pt-4">
          <Button
            variant="danger"
            className="flex items-center text-primary-foreground text-sm gap-2 md:px-5 md:py-3 cursor-pointer"
            onClick={logoutUser}
          >
           Sign out <span className="pr-1">{logoutIcon}</span> 
          </Button>
        </div>

      </Card>
    </aside>
    </>
  );
}

export default SideBar;