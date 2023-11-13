export interface IConfirmOrderResponse {
     id: string;
     createdAt: string;
     user: User;
     redeemedItem: RedeemedItem;
}

export interface RedeemedItem {
     id: string;
     name: string;
}

export interface User {
     id: string;
     name: string;
     lastname: string;
     phone: string;
     workplace: string;
}

export interface IConfirmOrderRequest {
     userId: string;
     redeemedItemId: string;
}
