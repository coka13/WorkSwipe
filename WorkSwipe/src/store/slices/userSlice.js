import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  technologies: [],
  isEmployer: false,
  isAdmin: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setGeneralDetail: (state, action) => {
        state.username = action.payload.username;
        state.isAdmin = action.payload.isAdmin;
        state.technologies = action.payload.technologies;
        state.isEmployer = action.payload.isEmployer;
    },
    setTechnologies: (state, action) => {
      state.technologies.push([...action.payload]);
    },
    
  },
});

export const { setAdmin, setTechnologies } = userSlice.actions;

export default userSlice.reducer;
