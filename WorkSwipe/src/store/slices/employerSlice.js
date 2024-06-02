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
        setEmployerGeneralDetail: (state, action) => {
            state.isAuthenticated = true;
            for (const key in action.payload) {
                state[key] = action.payload[key]
            }
        },
        updateEmployerField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
        employerLogout: (state) => {
            Object.assign(state, initialState); // Reset state to initial state
        },
    },
});

export const { setEmployerGeneralDetail, updateEmployerField,employerLogout } = employerSlice.actions;

export default employerSlice.reducer;
