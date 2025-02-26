import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: false,
  failure: false,
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducer: {
    onListingImageUpload: (state, action) => {
      state.success = action.payload;
    },
    onListingFailureUpload: (state, action) => {
      state.failure = action.payload;
    },
  },
});

export const { onListingImageUpload, onListingFailureUpload } =
  listingSlice.actions;
export default listingSlice.reducer;
