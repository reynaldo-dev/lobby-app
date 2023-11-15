import { Event, User } from '../tickets/interfaces/assistanceTicket.interface';
import { Challenge } from '../challenges/interfaces/challenges.interfaces';
import { IConsumable } from '../tickets/interfaces/consumablesTickets.interface';
import { IRecognition } from '../recognitions/interfaces/recognitions.interface';
import { User as UserInterface } from '../profile/interfaces/user.interface';

export type AuthStackParamList = {
     Login: undefined;
     Register: undefined;
};

export type PrivateStackParamList = {
     Home: undefined;
     Profile: undefined;
};

export type RootStackParamList = {
     Auth: AuthStackParamList;
     Root: PrivateStackParamList;
     QRCode: undefined;
     EditProfile: undefined;
     PasswordUpdate: undefined;
     Community: { id: string };
     Event: { id: string };
     SearchCommunity: undefined;
     Tickets: undefined;
     TicketAssistanceDetail: {
          event: Event;
          user: User;
          isActive: boolean;
          consumable?: IConsumable;
     };
     TicketConsumableDetail: {
          event: Event;
          user: User;
          isActive: boolean;
          consumable?: IConsumable;
          ticketId?: string;
          userId?: string;
     };
     Calendar: undefined;
     BarScanner: undefined;
     BarScannerStaff: undefined;
     EventHistory: undefined;
     Alliances: undefined;
     Recognitions: undefined;
     SendRecognition: { user: UserInterface };
     RecognitionDetails: { recognition: IRecognition };
     Redeemables: undefined;
     RedeemableDetail: { id: string };
     Step1: undefined;
     Step2: undefined;
     Step3: undefined;
     Step4: undefined;
     MyRecognitions: undefined;
     UpcomingEvents: undefined;
     MyCommunities: undefined;
     Ranking: undefined;
     Challenges: undefined;
     ChallengeDetail: { challenge: Challenge };
     TradeTicket: undefined;
};
