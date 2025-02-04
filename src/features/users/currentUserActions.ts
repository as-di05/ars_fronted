import { AppDispatch } from "../../store/store"; // Импортируйте AppDispatch
import {
  userFetchStart,
  userFetchSuccess,
  userFetchFailure,
} from "./currentUserSlice";
import { apiRequest } from "../../utils/api";
import { IUser } from "../../types/types";

export const userFetchProperties = () => async (dispatch: AppDispatch) => {
  dispatch(userFetchStart());

  try {
    const response: IUser = await apiRequest("GET", `/users/me`);
    if (response && response.id) {
      dispatch(userFetchSuccess(response));
    } else {
      dispatch(userFetchSuccess(null));
    }
  } catch (error: any) {
    dispatch(userFetchFailure(error.message));
  }
};
