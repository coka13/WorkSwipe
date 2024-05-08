import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  name: "",
  technologies: [],
  isEmployer: false,
  isAdmin: false,
  linkedIn: "",
  experience: 0,
  residence: "",
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
      state.residence = action.payload.residence;
  
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
    
  },
});

export const { deleteTech,setTechnologies, setGeneralDetail,updateUserField } = userSlice.actions;

export default userSlice.reducer;
