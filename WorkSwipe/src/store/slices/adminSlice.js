import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  name: "",
  url: "",
<<<<<<< HEAD
  email: ""
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminGeneralDetail: (state, action) => {
      state.isAuthenticated = true;
      for (const key in action.payload) {
        state[key] = action.payload[key]
      }
    },

    updateAdminField: (state, action) => {
      const { field, value } = action.payload;
      console.log(field, value)
      
    state[field] = value;
  },
  
  adminLogout: (state) => {
    Object.assign(state, initialState); // Reset state to initial state
  },
},
},
);

export const { adminLogout, setAdminGeneralDetail,updateAdminField } = adminSlice.actions;
=======
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
>>>>>>> d395581 (admin,jobSeeker,employer,auth slices)

export default adminSlice.reducer;
