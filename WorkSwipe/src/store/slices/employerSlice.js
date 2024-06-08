import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    name: "",
    url: "",
    email: "",
    linkedInUrl: "",
    companyName: "",
    
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
            console.log(action.payload)
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
