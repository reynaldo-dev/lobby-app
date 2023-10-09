export interface ILeague {
  id: string;
  name: string;
  minReceivedRecognitions: number;
  maxReceivedRecognitions: number;
  color: string;
}

export interface IRanking {
  id: string;
  name: string;
  lastname: string;
  email: string;
  picture: null | string;
  recognitionsReceivedCount: number;
  league: ILeague | null;
}

export interface IUserInLeague {
  id: string;
  name: string;
  lastname: string;
  email: string;
  picture: null;
}
