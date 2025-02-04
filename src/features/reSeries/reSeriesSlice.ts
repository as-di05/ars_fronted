import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICommonType } from "../../types/types";

interface ReSeriesState {
  state: ICommonType[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReSeriesState = {
  state: null,
  loading: false,
  error: null,
};

export const reSeriesSlice = createSlice({
  name: "reSeries",
  initialState,
  reducers: {
    reSeriesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    reSeriesSuccess: (state, action: PayloadAction<ICommonType[] | null>) => {
      state.state = action.payload;
      state.loading = false;
    },
    reSeriesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { reSeriesStart, reSeriesSuccess, reSeriesFailure } =
  reSeriesSlice.actions;

export default reSeriesSlice.reducer;
