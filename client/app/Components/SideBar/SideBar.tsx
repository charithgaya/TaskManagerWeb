"use client";

import { useUserContext } from '@/context/userContext';
import Profile from '../Profile/Profile';
import RadioChart from '../RadioChart/RadioChart';
import Button from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator";
import { useContext, useEffect } from 'react';
import { SideBarContext } from '@/providers/SideBarProvider';
import { usePathname } from "next/navigation";
import { logoutIcon } from '@/app/utils/icons';
import { Card } from '@/components/ui/card';

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
          className="fixed inset-0 bg-black/60 z-60 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside 
        className={`
          fixed top-0 right-0 h-full w-[85%] max-w-[22rem] z-50 p-3 transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : 'translate-x-full'} 
          md:translate-x-0 md:static md:w-[20rem] lg:w-[21rem] xl:w-[22rem] md:p-4
        `}
      >
      <div className='h-full'>
        <Card className="h-full flex flex-col justify-between backdrop-blur-xl bg-background/80 rounded-2xl lg:rounded-3xl overflow-hidden lg:overflow-visible lg:flex-none">

          {/* Top */}
          <div className="flex-1 space-y-6 overflow-y-auto scrollbar-thin lg:overflow-visible">
            <Profile />
            <Separator />

            <div className="px-1">
              <RadioChart />
            </div>

          </div>

          {/* Bottom */}
          <div className="flex items-center justify-center">
            <Button
              variant="danger"
              className="flex items-center text-sm gap-2 md:text-base py-2.5 md:py-3 cursor-pointer"
              onClick={logoutUser}
            >
              Sign out <span className="pr-1">{logoutIcon}</span> 
            </Button>
          </div>

        </Card>
      </div>
    </aside>
    </>
  );
}

export default SideBar;