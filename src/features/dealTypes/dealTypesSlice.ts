import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICommonType } from "../../types/types";

interface DealTypesState {
  state: ICommonType[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: DealTypesState = {
  state: null,
  loading: false,
  error: null,
};

export const dealTypesSlice = createSlice({
  name: "dealTypes",
  initialState,
  reducers: {
    dealTypesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    dealTypesSuccess: (state, action: PayloadAction<ICommonType[] | null>) => {
      state.state = action.payload;
      state.loading = false;
    },
    dealTypesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { dealTypesStart, dealTypesSuccess, dealTypesFailure } =
  dealTypesSlice.actions;

export default dealTypesSlice.reducer;
