import { createSlice } from '@reduxjs/toolkit'

const initialState = {
technologies:[]
}

const techSlice = createSlice({
  name: "technologies",
  initialState,
  reducers: {
    setSystemTechnologies: (state, action) => {
        state.technologies=action.payload
    },

  }
});

export const {setSystemTechnologies} = techSlice.actions

export default techSlice.reducer