export interface IPagination {
     from: number;
     limit: number;
}

//Events interfaces
export interface IInactiveEvents {
     id: string;
     title: string;
     description: string;
     status: string;
     isPrivate: string;
     createdAt: Date;
     place: null | string;
     communityId: string;
     link: null | string;
     score: number;
     dateTime: Date;
     createdBy: string;
     eventCategoryId: string;
     eventCategory: EventCategory;
     AssistanceTicket: AssistanceTicket[];
}

export interface EventCategory {
     id: string;
     name: string;
     createdAt: Date;
}

//Assistance Ticket interfaces
export interface AssistanceTicket {
     wasPresent: boolean;
}

//Alliances interfaces
export interface IAlliances {
     allianceCategory: AllianceCategory;
     allianceCategoryId: string;
     benefits: string[];
     createdAt: Date;
     description: string;
     endDate: Date;
     id: string;
     initialDate: Date;
     name: string;
}

export interface AllianceCategory {
     name: string;
}

export interface fcmTokens {
     userId: string;
     token: string;
}
