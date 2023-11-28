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
     topThirtyUsers: UserData[];
     userPosition: UserData;
}

export interface UserData {
     id: string;
     name: string;
     lastname: string;
     picture: string;
     league: League;
     totalRecognitions: number;
     position?: number;
}

export interface League {
     id: string;
     name: string;
     color: string;
}
