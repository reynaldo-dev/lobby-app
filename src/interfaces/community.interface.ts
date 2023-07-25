export interface DataCommunityUser {
  total: number;
  data: DataCommunityUser[];
}

export interface ICommutiesUser {
  userId: string;
  communityId: string;
  createdAt: Date;
  community: ICommunity;
  user: User;
}

export interface ICommunity {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: Date;
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
