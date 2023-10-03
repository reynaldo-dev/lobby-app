import {
  Event,
  User,
} from '../redux/services/assistanceTicket/interfaces/assistanceTicket.interface';
import { IConsumable } from '../redux/services/consumableTicket/interfaces/consumablesTickets.interface';
import { IRecognition } from '../redux/services/recognitions/interfaces/recognitions.interface';
import { User as UserInterface } from '../redux/slices/user/user.interface';
import { MyCommunities } from '../home/screens/Community/components/MyCommunities';

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
  Redeemables: undefined;
  Step1: undefined;
  Step2: undefined;
  Step3: undefined;
  Step4: undefined;
  MyRecognitions: { recognitions: IRecognition[] };
  MyUpcomingEvents: undefined;
  MyCommunities: undefined;
};
