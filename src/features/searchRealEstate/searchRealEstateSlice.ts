import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchRealEstateSlice {
  searchQuery: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: SearchRealEstateSlice = {
  searchQuery: null,
  loading: false,
  error: null,
};

export const searchRealEstateSlice = createSlice({
  name: "searchRealEstate",
  initialState,
  reducers: {
    searchFilterProperty: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.loading = false;
    },
  },
});

export const { searchFilterProperty } = searchRealEstateSlice.actions;

export default searchRealEstateSlice.reducer;
