import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { communitiesService } from '../services/communities.service';
import user from '../slices/user.slice';
import trade from '../slices/trade-ticket.slice';
import { assistanceTicketApi } from '../services/assitanceTicket.service';
import { eventsApi } from '../services/events.service';
import { consumablesTicketsApi } from '../services/consumableTicket.service';
import { userApi } from '../services/user.service';
import { alliancesApi } from '../services/alliances.service';
import { redeemablesApi } from '../services/redeemeables.service';
import { recognitionsApi } from '../services/recognitions.service';
import { leaguesApi } from '../services/leagues.service';
import { challengesApi } from '../services/challenges.service';
import { notificationsApi } from '../services/notifications.service';
import { fcmTokensApi } from '../services/fcm-tokens.service';

export const store = configureStore({
     reducer: {
          user,
          trade,
          [communitiesService.reducerPath]: communitiesService.reducer,
          [assistanceTicketApi.reducerPath]: assistanceTicketApi.reducer,
          [eventsApi.reducerPath]: eventsApi.reducer,
          [consumablesTicketsApi.reducerPath]: consumablesTicketsApi.reducer,
          [userApi.reducerPath]: userApi.reducer,
          [alliancesApi.reducerPath]: alliancesApi.reducer,
          [redeemablesApi.reducerPath]: redeemablesApi.reducer,
          [recognitionsApi.reducerPath]: recognitionsApi.reducer,
          [leaguesApi.reducerPath]: leaguesApi.reducer,
          [challengesApi.reducerPath]: challengesApi.reducer,
          [notificationsApi.reducerPath]: notificationsApi.reducer,
          [fcmTokensApi.reducerPath]: fcmTokensApi.reducer,
     },
     middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
               immutableCheck: { warnAfter: 128 },
               serializableCheck: { warnAfter: 128 },
          }).concat(
               communitiesService.middleware,
               assistanceTicketApi.middleware,
               eventsApi.middleware,
               consumablesTicketsApi.middleware,
               userApi.middleware,
               alliancesApi.middleware,
               redeemablesApi.middleware,
               recognitionsApi.middleware,
               leaguesApi.middleware,
               challengesApi.middleware,
               notificationsApi.middleware,
               fcmTokensApi.middleware
          ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
