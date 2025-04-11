export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  location: string;
  memberSince: string;
  avatar: string;
  skills: string[];
  team?: Team;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

export type Team = {
  id: string;
  name: string;
  description: string;
  leader: string;
  maxMembers: number;
  currentMembers: number;
  members: User[];
  projectIdea?: string;
}

export type LoginCredentials = {
  email: string;
  password: string;
}