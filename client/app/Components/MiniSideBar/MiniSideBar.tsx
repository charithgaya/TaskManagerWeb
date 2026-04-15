"use client";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import IconGrid from '@/public/Icons/IconGrid';
import IconFileCheck from '@/public/Icons/IconFileCheck';
import IconCheck from '@/public/Icons/IconCheck';
import IconStopwatch from '@/public/Icons/IconStopwatch';
import Link from 'next/link';
import { dashboardIcon } from '@/app/utils/icons';
import { useContext } from "react";
import { SideBarContext } from "@/providers/SideBarProvider";
import { Separator } from '@/components/ui/separator';

function MiniSideBar() {

  const { setIsOpen } = useContext(SideBarContext);
  const pathname = usePathname();

  const getStrokeColor = (link: string) => {
    return pathname === link ? "#3aafae" : "currentColor";
  }

  const navItems = [
    {
      icon:<IconGrid stroke={getStrokeColor("/")} />,
      title: "All",
      link: "/"
    },
    {
      icon:<IconFileCheck stroke={getStrokeColor("/completed")} />,
      title: "Completed",
      link: "/Completed"
    },
    {
      icon: <IconCheck stroke={getStrokeColor("/pending")} />,
      title: "Pending",
      link: "/Pending"
    },
    {
      icon: <IconStopwatch stroke={getStrokeColor("/overdue")} />,
      title: "Overdue",
      link: "/Overdue"
    }
  ];
  return (
    <div className='w-20 flex flex-col'>
      <div className='flex items-center justify-center h-20'>
        <Image src="/logo-removebg.png" alt="Logo" width={70} height={70} loading='eager'/>
      </div>

      <div className='flex items-center justify-center h-20'>
        <button
          type='button'
          onClick={() => {
            if(window.innerWidth < 768){
            setIsOpen(true);
            }}}
            className='w-12 h-12 flex items-center justify-center rounded-xl hover:bg-muted cursor-pointer md:hidden'
        >
          {dashboardIcon}
        </button>
      </div>
      <Separator className='h-[2px]'/>

      <div className='mt-8 flex-1 flex flex-col items-center justify-between'>
        <ul className='flex flex-col gap-4'>

          {navItems.map((item, index) => (
            <li key={index} className='relative group'>
              
                <Link 
                  className='w-12 h-12 flex items-center justify-center rounded-xl hover:bg-muted cursor-pointer' 
                  href={item.link}
                >
                  {item.icon}
                </Link>

              <span className='absolute left-8 top-[50%] -translate-y-[-50%] px-2 py-3 rounded-sm shadow-lg bg-muted text-foreground text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
                {item.title}
              </span>
            </li>
          ))}
        </ul>

      </div>      
    </div>
  )
}

export default MiniSideBar;
