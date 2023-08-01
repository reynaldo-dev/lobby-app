import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { communitiesService } from '../services/community/communities.service';
import user from '../slices/user/user.slice';
import { assistanceTicketApi } from '../services/assistanceTicket/assitanceTicket.service';
import { eventsApi } from '../services/events/events.service';

export const store = configureStore({
  reducer: {
    user,
    [communitiesService.reducerPath]: communitiesService.reducer,
    [assistanceTicketApi.reducerPath]: assistanceTicketApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      communitiesService.middleware,
      assistanceTicketApi.middleware,
      eventsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
