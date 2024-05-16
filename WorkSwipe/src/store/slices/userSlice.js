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
      for(const key in action.payload){
        state[key]=action.payload[key]
      }
    },
    setTechnologies: (state, action) => {
      state.technologies=action.payload
    },
    updateUserField: (state, action) => {
      const { field, value } = action.payload;
      console.log(field, value)
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
