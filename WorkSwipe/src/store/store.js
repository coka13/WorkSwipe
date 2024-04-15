import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './slices/userSlice'
import registerReducer from './slices/registerSlice'
import jobOffersReducer from './slices/jobOffersSlice'


export const store = configureStore({
    reducer: {
      users: usersReducer, register: registerReducer, opportunities: jobOffersReducer
    },
  })
