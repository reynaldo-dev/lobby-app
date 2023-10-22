export interface IEvent {
     communityId: string;
     createdAt: string;
     createdBy: string;
     dateTime: string;
     description: string;
     eventCategoryId: string;
     id: string;
     isPrivate: string;
     link: null | string;
     place: string;
     score: number;
     status: string;
     title: string;
}

export interface IGetMyEventsResponse {
     createdAt: string;
     event: IEvent;
     eventId: string;
     id: string;
     isActive: boolean;
     qrCodeId: string;
     scannedAt: null | string;
     userId: string;
     wasPresent: boolean;
}
