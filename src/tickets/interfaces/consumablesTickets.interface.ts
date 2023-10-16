import { Link } from 'native-base';
export interface IConsumableTicketResponse {
  total: number;
  data: ConsumableTicketData[];
}

export interface IconsumableTicket {
  eventId: string;
  userId: string;
  consumableId: string;
}

export interface ConsumableTicketData {
  id: string;
  isActive: boolean;
  createdAt: Date;
  eventId: string;
  userId: string;
  consumableId: string;
  user: User;
  consumable: IConsumable;
  event: Event;
}

export interface IConsumable {
  name?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  status: string;
  isPrivate: string;
  createdAt: Date;
  place: string;
  communityId: string;
  dateTime: Date;
  link: string;
}

export interface User {
  id: string;
  isActive: boolean;
  email: string;
  name: string;
  lastname: string;
  createdAt: Date;
  rolId: string;
}

export interface IConsumableTicketRedeem {
  id: string;
  isActive: boolean;
  createdAt: Date;
  eventId: string;
  userId: string;
  consumableId: string;
}
