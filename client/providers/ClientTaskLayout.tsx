"use client";
import Modal from "@/app/Components/Modal/Modal";
import { useTasks } from "@/context/taskContext.js";
import type { PropsWithChildren } from "react";

function ClientTaskLayout({ children }: PropsWithChildren) {
  const { isTaskModalOpen } = useTasks();

  // console.log("ClientTaskLayout rendered. isTaskModalOpen:", isTaskModalOpen);
  return (
    <>
      {children}
      
      {isTaskModalOpen && <Modal />}
    </>
  );
}

export default ClientTaskLayout;
