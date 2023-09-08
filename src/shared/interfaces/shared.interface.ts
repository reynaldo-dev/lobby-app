export interface IPagination {
  from: number;
  limit: number;
}
export interface IInactiveEvents {
  id: string;
  title: string;
  description: string;
  status: string;
  isPrivate: string;
  createdAt: Date;
  place: null | string;
  communityId: string;
  link: null | string;
  score: number;
  dateTime: Date;
  createdBy: string;
  eventCategoryId: string;
  eventCategory: EventCategory;
  AssistanceTicket: AssistanceTicket[];
}
export interface AssistanceTicket {
  wasPresent: boolean;
}
export interface EventCategory {
  id: string;
  name: string;
  createdAt: Date;
}

export interface IAlliances {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  initialDate: Date;
  endDate: Date;
  createdAt: Date;
}
