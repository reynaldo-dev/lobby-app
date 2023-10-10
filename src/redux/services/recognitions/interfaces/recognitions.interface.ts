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
