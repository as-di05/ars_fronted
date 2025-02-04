import { AppDispatch } from "../../store/store";
import {
  reHeatingsStart,
  reHeatingsSuccess,
  reHeatingsFailure,
} from "./reHeatingsSlice";
import { apiRequest } from "../../utils/api";
import { ICommonType } from "../../types/types";

export const reHeatingsProperties = () => async (dispatch: AppDispatch) => {
  dispatch(reHeatingsStart());

  try {
    const response: ICommonType[] = await apiRequest(
      "GET",
      `/real-estate/heatings`
    );
    if (response?.length > 0) {
      dispatch(reHeatingsSuccess(response));
    } else {
      dispatch(reHeatingsSuccess(null));
    }
  } catch (error: any) {
    dispatch(reHeatingsFailure(error.message));
  }
};
