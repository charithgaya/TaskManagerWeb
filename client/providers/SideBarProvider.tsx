"use client";
import SideBar from '@/app/Components/SideBar/SideBar';
import { useUserContext } from '@/context/userContext';
import { createContext, useState } from 'react';

export const SideBarContext = createContext({
  isOpen: false,
  setIsOpen: (value : boolean) => {}
});

function SideBarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useUserContext();
  const userId = user?._id;
  return (
      <SideBarContext.Provider value={{ isOpen, setIsOpen }}>
        <div className="flex w-full">
          { children }
          {userId && <SideBar />}
        </div>
      </SideBarContext.Provider>
  )
}

export default SideBarProvider;
