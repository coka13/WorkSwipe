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
    deleteSystemTechnology: (state, action) => {
      state.technologies = state.technologies.filter(tech => tech !== action.payload);
    },
   addSystemTechnology: (state, action) => {
      state.technologies.push(action.payload);
    }

  }
});

export const {setSystemTechnologies,deleteSystemTechnology,addSystemTechnology} = techSlice.actions

export default techSlice.reducer
