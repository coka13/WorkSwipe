import { createSlice } from "@reduxjs/toolkit";
import { arraysAreEqual } from "../../utils/arraysEqual";

const initialState = {
  offers: [],
  currentOffer: {},
};

const jobOffersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    setOpportunities: (state, action) => {
      state.offers = action.payload.opportunities.filter((op)=>{
        return arraysAreEqual(op.technologies,action.payload.technologies)
      });
    },
    setNewOffer: (state, action) => {
      const NewOffer = action.payload;
      state.offers.push(NewOffer);
    },
    setDeleteOffer: (state, action) => {
      let ind = 0;
      const deleteOffer = state.offers.find((offer, index) => {
        if (offer._id === action.payload.id) {
          ind = index;
          return offer;
        }
      });
      state.currentOffer = deleteOffer;
      state.offers.splice(ind, 1);
    },
  },
});

export const { setCurrentOffer,setDeleteOffer, setNewOffer, setOpportunities } =
  jobOffersSlice.actions;

export default jobOffersSlice.reducer;
