import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerForm: {},
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegisterForm: (state, action) => {
      if (!Array.isArray(action.payload)) {
        state.registerForm[action.payload.name] = action.payload.value;
      } else {
        state.registerForm[action.payload.name].push(action.payload.value);
      }
    },
  },
});

export const { setRegisterForm } = registerSlice.actions;

export default registerSlice.reducer;
