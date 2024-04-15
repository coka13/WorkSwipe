import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  name: "",
  technologies: [],
  isEmployer: false,
  isAdmin: false,
  linkedIn: "",
  experience: 0,
  location: "",
  url: "",
  email:""
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setGeneralDetail: (state, action) => {
      state.name = action.payload.name;
      state.linkedIn = action.payload.linkedIn;
      state.experience = action.payload.experience;
      state.location = action.payload.location;
      state.url = action.payload.url;
      state.username = action.payload.username;
      state.isAdmin = action.payload.isAdmin;
      state.technologies = action.payload.technologies;
      state.isEmployer = action.payload.isEmployer;
      state.email = action.payload.email;
    },
    setTechnologies: (state, action) => {
      state.technologies.push([...action.payload]);
    },
  },
});

export const { setTechnologies, setGeneralDetail } = userSlice.actions;

export default userSlice.reducer;
