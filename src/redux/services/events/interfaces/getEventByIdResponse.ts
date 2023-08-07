export interface GetEventByIDResponse {
  id: string;
  title: string;
  description: string;
  status: string;
  isPrivate: string;
  createdAt: string;
  place: string;
  communityId: string;
  score: number;
  dateTime: string;
  eventCategoryId: string;
  community: Community;
  Consumable: any[];
  eventCategory: EventCategory;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: string;
}

export interface EventCategory {
  id: string;
  name: string;
  createdAt: string;
}

export interface IEnrollEventResponse {
  id: string;
  title: string;
  description: string;
  status: string;
  isPrivate: string;
  createdAt: Date;
  place: string;
  communityId: string;
  score: null;
  dateTime: Date;
  eventCategoryId: null;
}

export interface ICancelEventResponse {
  id: string;
  isActive: boolean;
  createdAt: Date;
  eventId: string;
  userId: string;
}
