import {
  Event,
  User,
} from '../redux/services/assistanceTicket/interfaces/assistanceTicket.interface';
import { IConsumable } from '../redux/services/consumableTicket/interfaces/consumablesTickets.interface';

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
};
