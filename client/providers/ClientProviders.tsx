"use client";
import type { ReactNode } from "react";
import ClientTaskLayout from "@/providers/ClientTaskLayout";

type ClientProvidersProps = {
  children: ReactNode;
};

function ClientProviders({ children }: ClientProvidersProps) {
  return (
    
      <ClientTaskLayout>
        {children}
      </ClientTaskLayout>
   
  );
}

export default ClientProviders;