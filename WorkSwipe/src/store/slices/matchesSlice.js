import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  matches: [],
};

const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    setMatches: (state, action) => {
      state.matches = action.payload;
    },
    setAddMatch: (state, action) => {
      state.matches.push(action.payload);
    },
    setDeleteMatch: (state, action) => {
        let ind = 0;
        const deleteMatch = state.matches.find((match, index) => {
          if (match._id === action.payload.id) {
            ind = index;
            return match;
          }
        });
        state.matches.splice(ind, 1);
      },
  },
});

export const {setDeleteMatch,setAddMatch,setMatches} = matchesSlice.actions;

export default matchesSlice.reducer;
