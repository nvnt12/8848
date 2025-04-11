'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { mockTeams } from '@/lib/mock-data';
import { Team } from '@/lib/types';
import { useAuth } from '@/components/auth-provider';
import { IoSearchOutline } from "react-icons/io5";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>(mockTeams);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBySpots, setSortBySpots] = useState(false);
  const { user } = useAuth();
  const [joinedTeamId, setJoinedTeamId] = useState<string | null>(user?.team?.id || null);

  const teamsPerPage = 6;

  // Filter and sort teams
  const filteredTeams = teams
    .filter((team) => {
      const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(team.maxMembers);
      return matchesSearch && matchesSize;
    })
    .sort((a, b) => {
      if (sortBySpots) {
        return (b.maxMembers - b.currentMembers) - (a.maxMembers - a.currentMembers);
      }
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredTeams.length / teamsPerPage);
  const paginatedTeams = filteredTeams.slice(
    (currentPage - 1) * teamsPerPage,
    currentPage * teamsPerPage
  );
  
  // Join Team and update team member
  const handleJoinTeam = (team: Team) => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert('User not found');
      return;
    }
  
    const parsedUser = JSON.parse(storedUser);
  
    if (parsedUser.team) {
      alert('You are already a member of a team');
      return;
    }
  
    if (team.currentMembers >= team.maxMembers) {
      alert('This team is full');
      return;
    }
  
    // Update teams
    const updatedTeams = teams.map((t) => {
      if (t.id === team.id) {
        return {
          ...t,
          currentMembers: t.currentMembers + 1,
          members: [...t.members, parsedUser],
        };
      }
      return t;
    });
    
    setJoinedTeamId(team.id);
    setTeams(updatedTeams);
    alert(`Successfully joined ${team.name}`);
  };
  
  

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex w-full max-w-sm h-11 items-center justify-start">
          <IoSearchOutline  className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search teams..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant={sortBySpots ? "secondary" : "outline"}
            onClick={() => setSortBySpots(!sortBySpots)}
            className=''
          >
            Sort by Available Spots
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-medium">Filter by team size:</span>
        {[1, 2, 3, 4, 5].map((size) => (
          <label key={size} className="flex items-center space-x-2 mr-1">
            <Checkbox
              checked={selectedSizes.includes(size)}
              onCheckedChange={(checked) => {
                setSelectedSizes(
                  checked
                    ? [...selectedSizes, size]
                    : selectedSizes.filter((s) => s !== size)
                );
              }}
            />
            <span className="text-sm">{size}</span>
          </label>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedTeams.map((team) => (
          <Card key={team.id} className="bg-dashboard border-none p-6 space-y-4">
            <div className="flex justify-between items-start flex-wrap gap-3">
              <div className="flex items-center gap-3 sm:gap-4">
                <Avatar className="bg-background-light/60 h-14 w-14">
                  <AvatarFallback>{team.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-base">{team.name}</h2>
                  <p className="text-xs text-gray-400">Led by {team.leader}</p>
                </div>
              </div>
                <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  team.maxMembers - team.currentMembers === 1
                  ? 'bg-red-500/30 text-red-500'
                  : team.maxMembers - team.currentMembers === 3
                  ? 'bg-yellow-500/30 text-yellow-500'
                  : team.maxMembers - team.currentMembers === 4
                  ? 'bg-green-500/30 text-green-500'
                  : 'bg-secondary/30 text-secondary'
                }`}
                >
                {team.maxMembers - team.currentMembers} spots left
                </span>
            </div>
          
            <p className="text-sm text-gray-300">{team.description}</p>
          
            <div className="flex justify-between items-center">
              <p className="text-xs">
                {team.currentMembers} / {team.maxMembers} members
              </p>
              {joinedTeamId === team.id ? (
                <span className="text-sm font-medium text-green-500">Joined</span>
              ) : (
                <button
                  className="text-sm text-secondary font-semibold disabled:cursor-not-allowed hover:underline disabled:opacity-50"
                  onClick={() => handleJoinTeam(team)}
                  disabled={team.currentMembers >= team.maxMembers || !!user?.team}
                >
                  {team.currentMembers >= team.maxMembers ? 'Team Full' : 'Join Team'}
                </button>
              )}
            </div>
          </Card>        
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}