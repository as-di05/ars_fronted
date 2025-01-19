import { AppDispatch } from "../../store/store";

import { apiRequest } from "../../utils/api";
import { ICommonType } from "../../types/types";
import {
  documentsFailure,
  documentsStart,
  documentsSuccess,
} from "./documentsSlice";

export const documentsProperties = () => async (dispatch: AppDispatch) => {
  dispatch(documentsStart());

  try {
    const response: ICommonType[] = await apiRequest(
      "GET",
      `/real-estate/documents`
    );
    if (response?.length > 0) {
      dispatch(documentsSuccess(response));
    } else {
      dispatch(documentsSuccess(null));
    }
  } catch (error: any) {
    dispatch(documentsFailure(error.message));
  }
};
