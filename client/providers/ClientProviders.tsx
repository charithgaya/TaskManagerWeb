"use client";
import type { ReactNode } from "react";
import ProfileProvider from "@/providers/ProfileProvider";
import ClientTaskLayout from "@/providers/ClientTaskLayout";

type ClientProvidersProps = {
  children: ReactNode;
};

function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ProfileProvider>
      <ClientTaskLayout>
        {children}
      </ClientTaskLayout>
    </ProfileProvider>
  );
}

export default ClientProviders;