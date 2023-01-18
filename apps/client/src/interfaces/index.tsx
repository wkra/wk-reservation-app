export interface Desk {
  id: number;
  name: string;
  description: string;
  order: number;
}

export interface User {
  username: string
}

export interface Reservation {
  id: number;
  desk: Desk;
  user: User
}

export type DateType = string;
