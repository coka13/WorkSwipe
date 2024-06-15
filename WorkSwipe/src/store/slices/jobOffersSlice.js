import { createSlice } from "@reduxjs/toolkit";
import { arraysAreEqual } from "../../utils/arraysEqual";

const initialState = {
  offers: [],
  currentOffer: {},
  currentIndex: 0,
};

const jobOffersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {
    setOpportunities: (state, action) => {
      console.log("jobOffers",action.payload)
      console.log("offers",state.offers)
      if(state.offers.length===0){
state.offers=action.payload
      }
      else{
      state.offers = action.payload.filter((op)=>{
        return arraysAreEqual(op.technologies,action.payload.technologies)
      });
    }
      console.log("offers",state.offers)
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
    setCurrentOffer: (state, action) => {
      state.currentOffer = action.payload;
    },
    setCurrentIndex: (state, action) => { 
      state.currentIndex = action.payload;
    }
  },
});

export const { setCurrentIndex,setCurrentOffer,setDeleteOffer, setNewOffer, setOpportunities } =
  jobOffersSlice.actions;

export default jobOffersSlice.reducer;
