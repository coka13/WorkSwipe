import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/userSlice";
import registerReducer from "./slices/registerSlice";
import jobOffersReducer from "./slices/jobOffersSlice";
import matchesReducer from "./slices/matchesSlice";
import techsReducer from "./slices/techSlice";
import employerOffersReducer from "./slices/employerOffersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    register: registerReducer,
    opportunities: jobOffersReducer,
    matches: matchesReducer,
    technologies: techsReducer,
    employerOffers: employerOffersReducer,
  },
});
