// Para la respuesta de getAll
export interface Category {
  id: string;
  name: string;
  createdAt: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  initialDate: string;
  endDate: string;
  credits: number;
  coupons: number;
  category: Category;
  availableCoupons: number;
}

export interface GetAllResponse {
  total: number;
  data: Challenge[];
}

// Para la respuesta de getById
export interface Indications {
  indications: string[];
}

export interface GetByIdResponse {
  id: string;
  title: string;
  description: string;
  initialDate: string;
  endDate: string;
  credits: number;
  eventCategoryId: string;
  indications: string[];
  createdAt: string;
  coupons: number;
  ChallengeTicket: any[];
  eventCategory: Category;
}

// Para la respuesta de amIOnChallenge
export interface AmIOnChallengeResponse {
  amIOnChallenge: boolean;
}

// Para la respuesta de takeChallenge
export interface TakeChallengeResponse {
  ok: boolean;
  message: string;
}

export interface TakeChallengeDto {
  userId: string;
}
