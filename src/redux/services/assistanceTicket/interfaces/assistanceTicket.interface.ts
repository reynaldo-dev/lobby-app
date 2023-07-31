export interface IAssistanceTicket {
  eventId: string;
  userId: string;
}

export interface IAssistanceTicketListResponse {
  total: number;
  data: AssistanceTicketData[];
}
export interface AssistanceTicketData {
  id: string;
  isActive: boolean;
  createdAt: Date;
  eventId: string;
  userId: string;
  user: User;
  event: Event;
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

export interface IAssistanceTicketByUserIDResponse {
  id: string;
  isActive: boolean;
  createdAt: Date;
  eventId: string;
  userId: string;
  event: Event;
}

export interface IAssistanceTicketResponse {
  id: string;
  isActive: boolean;
  createdAt: Date;
  eventId: string;
  userId: string;
}
