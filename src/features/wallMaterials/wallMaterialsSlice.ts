import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICommonType } from "../../types/types";

interface WallMaterialsState {
  state: ICommonType[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: WallMaterialsState = {
  state: null,
  loading: false,
  error: null,
};

export const wallMaterialsSlice = createSlice({
  name: "wallMaterials",
  initialState,
  reducers: {
    wallMaterialsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    wallMaterialsSuccess: (
      state,
      action: PayloadAction<ICommonType[] | null>
    ) => {
      state.state = action.payload;
      state.loading = false;
    },
    wallMaterialsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  wallMaterialsStart,
  wallMaterialsSuccess,
  wallMaterialsFailure,
} = wallMaterialsSlice.actions;

export default wallMaterialsSlice.reducer;
