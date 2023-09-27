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
  points: number;
  userSource: IUserRecognition;
  userTarget: IUserRecognition;
  createdAt: Date;
}

export interface ICreateRecognitionDto {
  userTargetId: string;
  userSourceId: string;
  description: string;
  points: number;
  createdAt: Date;
}
