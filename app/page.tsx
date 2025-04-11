'use client'

import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/teams');
    }
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, router, isLoading]);
    
  return null;
}
