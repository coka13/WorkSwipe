import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employerOffers: [],
};

const employerOffersSlice = createSlice({
  name: "employerOffers",
  initialState,
  reducers: {
    setEmployerOffers: (state, action) => {
      state.employerOffers = action.payload;
    },
    setNewEmployerOffer: (state, action) => {
      const NewOffer = action.payload;
      state.employerOffers.push(NewOffer);
    },
    setDeleteEmployerOffer: (state, action) => {
      let ind = 0;
      const deleteOffer = state.employerOffers.find((offer, index) => {
        if (offer._id === action.payload.id) {
          ind = index;
          return offer;
        }
      });
      state.currentOffer = deleteOffer;
      state.employerOffers.splice(ind, 1);
    },
  },
});

export const {
  setDeleteEmployerOffer,
  setEmployerOffers,
  setNewEmployerOffer,
} = employerOffersSlice.actions;

export default employerOffersSlice.reducer;
