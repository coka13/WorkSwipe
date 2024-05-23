import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  name: "",
  url: "",
  email:""
};

const adminSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    setGeneralDetail: (state, action) => {
      state.isAuthenticated = true;
      for(const key in action.payload){
        state[key]=action.payload[key]
      }
    },
   
    },
    updateAdminField: (state, action) => {
      const { field, value } = action.payload;
      console.log(field, value)
     
      state[field] = value;
    },
  
    logout: (state) => {
      Object.assign(state, initialState); // Reset state to initial state
    },
  },
);

export const { setGeneralDetail,updateAdminField,logout } = adminSlice.actions;

export default adminSlice.reducer;
