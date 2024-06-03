import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    _id:"",
    role:"Job Seeker"
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthentication:(state,action)=>{
      state.isAuthenticated=action.payload
    },
    setUserRole:(state,action)=>{
      state.role=action.payload
    },
    setUserId:(state,action)=>{
      state._id=action.payload
    }

  }
});

export const { setAuthentication,setUserRole,setUserId} = authSlice.actions

export default authSlice.reducer