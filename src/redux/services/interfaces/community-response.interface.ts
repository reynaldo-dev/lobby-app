// Generated by https://quicktype.io

export interface GetCommunityByIDResponse {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: string;
  Event: IEvent[];
}

export interface IEvent {
  id: string;
  title: string;
  description: string;
  status: string;
  isPrivate: string;
  createdAt: string;
  place: string;
  communityId: string;
  dateTime: string;
}
