export interface User {
  name: string;
}

export type UserStatus = "ACTIVE"| "ARCHIVED"|"DELETED";


export interface Project {
status : UserStatus;
  _id: string;
  name: string;
  description: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  user?: User;       // user object may be optional
}