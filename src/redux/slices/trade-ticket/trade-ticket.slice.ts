import { createSlice } from "@reduxjs/toolkit";
import { IConfirmOrderResponse } from "../../services/reedemables/interfaces/confirm-order.interface";

const initialState: IConfirmOrderResponse = {
  id: "",
  createdAt: "",
  user: {
    id: "",
    name: "",
    lastname: "",
  },
  redeemedItem: {
    id: "",
    name: "",
  },
};

export const tradeTicketSlice = createSlice({
  name: "tradeTicket",
  initialState,
  reducers: {
    setTradeTicket: (state, action) => {
      state = action.payload;
      console.log(state);
    },
  },
});

export const { setTradeTicket } = tradeTicketSlice.actions;
export default tradeTicketSlice.reducer;
