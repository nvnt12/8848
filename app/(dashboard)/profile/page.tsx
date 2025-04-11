'use client';

import { useAuth } from '@/components/auth-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaGithub, FaLinkedin, FaEdit, FaShare, FaTwitter } from 'react-icons/fa';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex flex-wrap items-center gap-6">
          <Avatar className="h-32 w-32 border-4 border-primary">
            <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
            <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{user.firstName} {user.lastName}</h1>
            <p className="text-gray-500">{user.role}</p>
            <div className="flex gap-3 mt-2">
              <Button className="flex items-center gap-2">
                <FaEdit className="h-4 w-4" />
                Edit Profile
              </Button>
              <Button variant="secondary" className="flex bg-dashboard hover:bg-dashboard/80 text-light items-center gap-2">
                <FaShare className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className='bg-dashboard border-none'>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className="flex flex-col gap-2">
              <p className="text-base font-semibold text-gray-500">Email</p>
              <p className=" text-base font-semibold text-light !break-words">{user.email}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-base font-semibold text-gray-500">Location</p>
              <p className=" text-base font-semibold text-light">{user.location}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-base font-semibold text-gray-500">Member since</p>
              <p className=" text-base font-semibold text-light">{user.memberSince}</p>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-dashboard border-none'>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <p key={skill}  className='py-2 px-4 text-light bg-primary rounded-full text-sm font-semibold'>
                  {skill}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className='bg-dashboard border-none'>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className="flex gap-2 flex-wrap">
              <FaGithub className="h-5 w-5 text-gray-500" />
              <p className=" text-base font-semibold text-light !break-words">{user.socials.github}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <FaLinkedin className="h-5 w-5 text-gray-500" />
              <p className=" text-base font-semibold text-light !break-words">{user.socials.linkedin}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <FaTwitter className="h-5 w-5 text-gray-500" />
              <p className=" text-base font-semibold text-light !break-words">{user.socials.twitter}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}