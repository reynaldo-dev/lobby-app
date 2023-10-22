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

export interface AmIOnChallengeResponse {
     amIOnChallenge: boolean;
}

export interface TakeChallengeResponse {
     ok: boolean;
     message: string;
}

export interface TakeChallengeDto {
     userId: string;
}
