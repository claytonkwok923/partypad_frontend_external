// import { createSlice } from "@reduxjs/toolkit";

// const listingsSlice = createSlice({
//     name: "listings",
//     initialState: [],
//     reducers: {
//         createListing: (state, action) => {
//             const newListing = {
//                 id: Date.now(),
//                 ...action.payload,
//             };
//             state.push(newListing);
//         },
//         editListing: (state, action) => {
//             const index = state.findIndex((listing) => listing.id === action.payload.id);
//             if (index !== -1) {
//                 state[index] = { ...state[index], ...action.payload };
//             }
//         },
//         deleteListing: (state, action) => {
//             const index = state.findIndex((listing) => listing.id === action.payload);
//             if (index !== -1) {
//                 state.splice(index, 1);
//             }
//         },
//     },
// });

// export const { createListing, editListing, deleteListing } = listingsSlice.actions;
// export default listingsSlice.reducer;
