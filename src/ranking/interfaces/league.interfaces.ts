export interface ILeague {
  id: string;
  name: string;
  minReceivedRecognitions: number;
  maxReceivedRecognitions: number;
  color: string;
}

export interface IRankingHistoric {
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

export interface IRanking {
  id: string;
  name: string;
  lastname: string;
  picture: null;
  league: League;
  total: number;
}

export interface League {
  id: string;
  name: string;
  color: string;
}
