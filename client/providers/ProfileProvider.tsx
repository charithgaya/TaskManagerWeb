"use client";
import ProfileUserModal from '@/app/Components/Profile/ProfileUserModal';
import type { ReactNode } from 'react';


function ProfileProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ProfileUserModal />
    </>
  )
}

export default ProfileProvider
