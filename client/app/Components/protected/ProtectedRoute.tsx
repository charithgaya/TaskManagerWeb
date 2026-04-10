"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/userContext";

type ProtectedLayoutProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedLayoutProps) {
  const { userLoginStatus } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = await userLoginStatus();
      if (!isLoggedIn) {
        router.replace("/login");
      }
    };

    checkAuth();
  }, []);

  return <>{children}</>;
}