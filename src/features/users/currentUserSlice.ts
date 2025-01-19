import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/types";

// Типизация состояния
interface CurrentUserState {
  state: IUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: CurrentUserState = {
  state: null,
  loading: false,
  error: null,
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    userFetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    userFetchSuccess: (state, action: PayloadAction<IUser | null>) => {
      state.state = action.payload;
      state.loading = false;
    },
    userFetchFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { userFetchStart, userFetchSuccess, userFetchFailure } =
  currentUserSlice.actions;

export default currentUserSlice.reducer;
