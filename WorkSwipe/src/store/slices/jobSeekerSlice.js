import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  name: "",
  technologies: [],
  linkedIn: "",
  experience: "",
  residence: "",
  url: "",
  email:""
};

const jobSeekerSlice = createSlice({
  name: "jobSeekers",
  initialState,
  reducers: {
    setGeneralDetail: (state, action) => {
      state.isAuthenticated = true;
      for(const key in action.payload){
        state[key]=action.payload[key]
      }
    },
    setTechnologies: (state, action) => {
      state.technologies=action.payload
    },
    updateUserField: (state, action) => {
      const { field, value } = action.payload;
      if(field==="experience"){
        if(isNaN(value) || (+value<0)){
          return
        }
      }

      state[field] = value;
    },
    deleteTech: (state, action) => {
      const techToDel = action.payload; 
      state.technologies = state.technologies.filter((tech) => tech !== techToDel);
    },
    logout: (state) => {
      Object.assign(state, initialState); // Reset state to initial state
    },
  },
});

export const { deleteTech,setTechnologies, setGeneralDetail,updateUserField,logout } = jobSeekerSlice.actions;

export default jobSeekerSlice.reducer;
