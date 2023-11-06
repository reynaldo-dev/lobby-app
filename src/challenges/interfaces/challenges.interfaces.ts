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
     indications: string[];
}

export interface GetAllResponse {
     total: number;
     data: Challenge[];
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

export interface IMyChallenges {
     id: string;
     isActive: boolean;
     challengeId: string;
     done: boolean;
     claimedBy: string;
     challenge: Challenge;
}
