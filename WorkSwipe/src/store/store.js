import { configureWorkSwipe } from '@reduxjs/toolkit'
import usersReducer from './slices/userSlice'
export const WorkSwipe = configureWorkSwipe({
    reducer: {
      users: usersReducer
    },
  })
