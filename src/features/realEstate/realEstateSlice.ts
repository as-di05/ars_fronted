import { createSlice } from "@reduxjs/toolkit";

export const realEstateSlice = createSlice({
  name: "realEstate",
  initialState: {
    properties: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchPropertiesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPropertiesSuccess: (state, action) => {
      state.properties = action.payload;
      state.loading = false;
    },
    fetchPropertiesFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchPropertiesStart,
  fetchPropertiesSuccess,
  fetchPropertiesFailure,
} = realEstateSlice.actions;

export default realEstateSlice.reducer;
