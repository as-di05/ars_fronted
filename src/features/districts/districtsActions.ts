import { AppDispatch } from "../../store/store";
import {
  districtsStart,
  districtsSuccess,
  districtsFailure,
} from "./districtsSlice";
import { apiRequest } from "../../utils/api";
import { ICommonType } from "../../types/types";

export const districtsProperties = () => async (dispatch: AppDispatch) => {
  dispatch(districtsStart());

  try {
    const response: ICommonType[] = await apiRequest(
      "GET",
      `/real-estate/districts`
    );
    if (response?.length > 0) {
      dispatch(districtsSuccess(response));
    } else {
      dispatch(districtsSuccess(null));
    }
  } catch (error: any) {
    dispatch(districtsFailure(error.message));
  }
};
