import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slices/registerSlice";
import jobOffersReducer from "./slices/jobOffersSlice";
import matchesReducer from "./slices/matchesSlice";
import techsReducer from "./slices/techSlice";
import employerOffersReducer from "./slices/employerOffersSlice";
import authReducer from "./slices/authSlice";
import jobSeekerReducer from "./slices/jobSeekerSlice";
import adminReducer from "./slices/adminSlice";
import employerReducer from "./slices/employerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    opportunities: jobOffersReducer,
    matches: matchesReducer,
    technologies: techsReducer,
    employerOffers: employerOffersReducer,
    admin : adminReducer,
    employer: employerReducer,
    jobSeeker: jobSeekerReducer
  },
});
