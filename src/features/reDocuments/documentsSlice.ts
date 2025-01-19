import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICommonType } from "../../types/types";

interface DocumentsState {
  state: ICommonType[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: DocumentsState = {
  state: null,
  loading: false,
  error: null,
};

export const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    documentsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    documentsSuccess: (state, action: PayloadAction<ICommonType[] | null>) => {
      state.state = action.payload;
      state.loading = false;
    },
    documentsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { documentsStart, documentsSuccess, documentsFailure } =
  documentsSlice.actions;

export default documentsSlice.reducer;
