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
<<<<<<< HEAD
        setEmployerGeneralDetail: (state, action) => {
=======
        setGeneralDetail: (state, action) => {
>>>>>>> d395581 (admin,jobSeeker,employer,auth slices)
            state.isAuthenticated = true;
            for (const key in action.payload) {
                state[key] = action.payload[key]
            }
        },
<<<<<<< HEAD
        updateEmployerField: (state, action) => {
=======
        updateUserField: (state, action) => {
>>>>>>> d395581 (admin,jobSeeker,employer,auth slices)
            const { field, value } = action.payload;
            console.log(field, value)
            state[field] = value;
        },
<<<<<<< HEAD
        employerLogout: (state) => {
=======
        logout: (state) => {
>>>>>>> d395581 (admin,jobSeeker,employer,auth slices)
            Object.assign(state, initialState); // Reset state to initial state
        },
    },
});

<<<<<<< HEAD
export const { setEmployerGeneralDetail, updateEmployerField,employerLogout } = employerSlice.actions;
=======
export const { setGeneralDetail, updateUserField, logout } = employerSlice.actions;
>>>>>>> d395581 (admin,jobSeeker,employer,auth slices)

export default employerSlice.reducer;
