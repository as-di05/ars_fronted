import { AppDispatch } from "../../store/store";
import {
  reSeriesStart,
  reSeriesSuccess,
  reSeriesFailure,
} from "./reSeriesSlice";
import { apiRequest } from "../../utils/api";
import { ICommonType } from "../../types/types";

export const reSeriesProperties = () => async (dispatch: AppDispatch) => {
  dispatch(reSeriesStart());

  try {
    const response: ICommonType[] = await apiRequest(
      "GET",
      `/real-estate/series`
    );
    if (response?.length > 0) {
      dispatch(reSeriesSuccess(response));
    } else {
      dispatch(reSeriesSuccess(null));
    }
  } catch (error: any) {
    dispatch(reSeriesFailure(error.message));
  }
};
