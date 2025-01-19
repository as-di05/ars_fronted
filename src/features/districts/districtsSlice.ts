import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICommonType } from "../../types/types";

interface DistrictsState {
  state: ICommonType[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: DistrictsState = {
  state: null,
  loading: false,
  error: null,
};

export const districtsSlice = createSlice({
  name: "districts",
  initialState,
  reducers: {
    districtsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    districtsSuccess: (state, action: PayloadAction<ICommonType[] | null>) => {
      state.state = action.payload;
      state.loading = false;
    },
    districtsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { districtsStart, districtsSuccess, districtsFailure } =
  districtsSlice.actions;

export default districtsSlice.reducer;
