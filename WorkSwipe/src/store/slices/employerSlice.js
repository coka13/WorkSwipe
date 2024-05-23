import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    name: "",
    url: "",
    email: ""
};

const employerSlice = createSlice({
    name: "employers",
    initialState,
    reducers: {
        setGeneralDetail: (state, action) => {
            state.isAuthenticated = true;
            for (const key in action.payload) {
                state[key] = action.payload[key]
            }
        },
        updateUserField: (state, action) => {
            const { field, value } = action.payload;
            console.log(field, value)
            state[field] = value;
        },
        logout: (state) => {
            Object.assign(state, initialState); // Reset state to initial state
        },
    },
});

export const { setGeneralDetail, updateUserField, logout } = employerSlice.actions;

export default employerSlice.reducer;
