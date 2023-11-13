import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IConfirmOrderResponse } from '../../redeemables/interfaces/confirm-order.interface';

const initialState: IConfirmOrderResponse = {
     id: '',
     createdAt: '',
     user: {
          id: '',
          name: '',
          lastname: '',
          phone: '',
          workplace: '',
     },
     redeemedItem: {
          id: '',
          name: '',
     },
};

export const tradeTicketSlice = createSlice({
     name: 'tradeTicket',
     initialState,
     reducers: {
          setTradeTicket: (
               state,
               action: PayloadAction<IConfirmOrderResponse>
          ) => {
               state.id = action.payload.id;
               state.createdAt = action.payload.createdAt;
               state.user = action.payload.user;
               state.redeemedItem = action.payload.redeemedItem;
          },
     },
});

export const { setTradeTicket } = tradeTicketSlice.actions;
export default tradeTicketSlice.reducer;
