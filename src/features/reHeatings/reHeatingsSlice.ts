import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICommonType } from "../../types/types";

interface ReHeatingsState {
  state: ICommonType[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReHeatingsState = {
  state: null,
  loading: false,
  error: null,
};

// Создаем слайс для типов отоплений объектов недвижимости
export const reHeatingsSlice = createSlice({
  name: "reHeatings",
  initialState,
  reducers: {
    reHeatingsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    reHeatingsSuccess: (state, action: PayloadAction<ICommonType[] | null>) => {
      state.state = action.payload;
      state.loading = false;
    },
    reHeatingsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { reHeatingsStart, reHeatingsSuccess, reHeatingsFailure } =
  reHeatingsSlice.actions;

export default reHeatingsSlice.reducer;
