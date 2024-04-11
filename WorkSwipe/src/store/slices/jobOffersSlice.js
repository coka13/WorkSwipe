import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offers: [],
  currentOffer: {},
};

const jobOffersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    setOpportunities: (state, action) => {
      state.offers = action.payload.map((offer, index) => ({
        ...offer,
        zIndex: index + 1,
      }));
    },
    setCurrentOffer: (state, action) => {
      state.currentOffer = state.offers.find((offer) => {
        offer._id === action.payload.id;
      });
    },
  },
});

export const {setCurrentOffer,setOpportunities} = jobOffersSlice.actions;

export default jobOffersSlice.reducer;
