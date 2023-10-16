export interface IUserRecognition {
  id: string;
  name: string;
  lastname: string;
  email: string;
  picture: string | null;
}

export interface IRecognition {
  id: string;
  userTargetId: string;
  userSourceId: string;
  description: string;
  credits: number;
  categoryId: string;
  userSource: IUserRecognition;
  userTarget: IUserRecognition;
  createdAt: Date;
  isRead: boolean;
}

export interface ICreateRecognitionDto {
  userTargetId: string;
  userSourceId: string;
  description: string;
  credits: number;
  createdAt?: Date;
  categoryId: string;
}

export interface IRecognitionCategory {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
}

export interface IRecognitionHistory {
  category: Category;
  total: number;
  recognitions?: Recognition[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
}

export interface Recognition {
  id: string;
  userId: string;
  eventId: null;
  challengeId: null;
  recognitionId: string;
  earnedCredits: number;
  earnedIn: string;
  createdAt: Date;
}
