'use client';

import { Sidebar } from '@/components/sidebar';
import { useAuth } from '@/components/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoMenu } from 'react-icons/io5';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, router, isLoading]);

  if (isLoading || !user) return null;

  return (
    <div className="h-screen flex relative">
      <div className="hidden md:flex w-72 flex-col fixed inset-y-0 z-30 bg-background">
        <Sidebar />
      </div>

      {showSidebar && (
        <div className="fixed inset-0 z-40 bg-dark/50 md:hidden" onClick={() => setShowSidebar(false)}>
          <div
            className="w-72 h-full bg-background shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar />
          </div>
        </div>
      )}

      {!showSidebar && <button
        className="md:hidden fixed top-4 left-6 z-50 p-1 bg-dashboard text-light border border-gray-600 rounded"
        onClick={() => setShowSidebar(true)}
      >
        <IoMenu className="w-6 h-6" />
      </button>}

      <main className="bg-background text-light pt-10 md:pt-0 md:pl-72 flex-1 h-full overflow-y-auto w-full">
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
