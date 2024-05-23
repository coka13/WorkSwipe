import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    _id:"",
    role:""
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthentication:(state,action)=>{
      state.isAuthenticated=action.payload
    }
  }
});

export const { setAuthentication} = authSlice.actions

export default authSlice.reducer