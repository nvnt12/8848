'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from './auth-provider';
import { FaRegUser, FaUsers } from 'react-icons/fa6';

export function Sidebar({ setShowSidebar }: { setShowSidebar?: (show: boolean) => void }) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const routes = [
    {
      href: '/teams',
      label: 'Teams',
      icon: FaUsers,
    },
    {
      href: '/profile',
      label: 'Profile',
      icon: FaRegUser,
    },
  ];

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-dashboard">
      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setShowSidebar && setShowSidebar(false)}
              className={cn(
                'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer text-light hover:bg-primary/20 rounded-[6px] transition',
                pathname === route.href && 'bg-primary hover:bg-primary/90'
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className="h-5 w-5 mr-3" />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3">
        <Button
          onClick={logout}
          className="w-full bg-transparent text-light hover:bg-primary/20 transition"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}