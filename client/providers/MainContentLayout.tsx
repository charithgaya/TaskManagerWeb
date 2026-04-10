"use client";
import React from 'react'
import { useUserContext } from '@/context/userContext.js';

interface MainContentLayoutProps {
  children: React.ReactNode;
}
function MainContentLayout({ children }: MainContentLayoutProps) {
    const userId = useUserContext().user._id;
  return (
    <main className="flex-1 h-full bg-card border border-border shadow-sm rounded-2xl">
      {children}
    </main>
  )
}

export default MainContentLayout;
