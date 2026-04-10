"use client";
//import Modal from '@/app/Components/Modal/Modal';
import { useTasks } from '@/context/taskContext';
import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({children}: MainLayoutProps) {
  //const { isEditing } = useTasks();
  return (
    <main className="flex-1 mx-1 overflow-auto text-card-foreground bg-card"> 
        {children}
    </main>
  )
}

export default MainLayout;
