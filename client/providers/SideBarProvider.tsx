"use client";
import SideBar from '@/app/Components/SideBar/SideBar';
import { useUserContext } from '@/context/userContext';

function SideBarProvider() {

  const userId = useUserContext().user._id;
  return (
    <>
      {userId && <SideBar />}
    </>
  )
}

export default SideBarProvider;
