'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { login } from '@/lib/auth';
import { useAuth } from '@/components/auth-provider';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [email, setEmail] = useState('john.doe@example.com');
  const [password, setPassword] = useState('password');
  const router = useRouter();
  const { login: authLogin, user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/teams');
    }
  }, [user, router, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      authLogin(user);
      router.push('/teams');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  if (isLoading || user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-light">Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-1">
              <Label htmlFor="email" className="text-light text-sm font-medium">
                Email
              </Label>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1 mt-4">
              <Label htmlFor="password" className="text-light text-sm font-medium">
                Password
              </Label>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-light text-dark mt-8 hover:text-light">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}