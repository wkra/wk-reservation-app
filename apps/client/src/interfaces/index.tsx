export interface Desk {
  id: number;
  name: string;
  description: string;
  order: number;
}

export interface User {
  username: string;
  id: number;
}

export interface UserType {
  id: number;
  label: string;
  isAdmin: boolean;
}

export interface Reservation {
  id: number;
  desk: Desk;
  user: User;
}

export interface FullUserModel extends User {
  userType: UserType;
}

export type DateType = string;
