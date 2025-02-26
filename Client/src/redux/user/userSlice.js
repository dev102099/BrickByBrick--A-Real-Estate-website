import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  deleteLoading: false,
  signoutLoading: false,
  updatedAvatar: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      (state.currentUser = action.payload),
        (state.loading = false),
        (state.error = null);
    },
    singInFailure: (state, action) => {
      (state.error = action.payload), (state.loading = false);
    },
    onImageUpload: (state, action) => {
      state.updatedAvatar = action.payload;
    },
    onUpdateStart: (state) => {
      state.loading = true;
    },
    onUpdateSuccess: (state, action) => {
      (state.currentUser = action.payload),
        (state.loading = false),
        (state.error = null);
    },
    onUpdateFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    onDeleteStart: (state) => {
      state.deleteLoading = true;
    },
    onDeleteSuccess: (state) => {
      (state.currentUser = null),
        (state.error = null),
        (state.deleteLoading = false);
    },
    onDeleteFail: (state, action) => {
      (state.deleteLoading = false), (state.error = action.payload);
    },
    onSignoutStart: (state) => {
      state.signoutLoading = true;
    },
    onSignoutSuccess: (state) => {
      (state.currentUser = null),
        (state.error = null),
        (state.signoutLoading = false);
    },
    onSignoutFail: (state, action) => {
      (state.signoutLoading = false), (state.error = action.payload);
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  singInFailure,
  onImageUpload,
  onUpdateStart,
  onUpdateSuccess,
  onUpdateFailure,
  onDeleteStart,
  onDeleteFail,
  onDeleteSuccess,
  onSignoutStart,
  onSignoutSuccess,
  onSignoutFail,
} = userSlice.actions;
export default userSlice.reducer;
