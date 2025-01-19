import { AppDispatch } from "../../store/store";
import {
  dealTypesStart,
  dealTypesSuccess,
  dealTypesFailure,
} from "./dealTypesSlice";
import { apiRequest } from "../../utils/api";
import { ICommonType } from "../../types/types";

export const dealTypesProperties = () => async (dispatch: AppDispatch) => {
  dispatch(dealTypesStart());

  try {
    const response: ICommonType[] = await apiRequest(
      "GET",
      `/real-estate/deal-types`
    );
    if (response?.length > 0) {
      dispatch(dealTypesSuccess(response));
    } else {
      dispatch(dealTypesSuccess(null));
    }
  } catch (error: any) {
    dispatch(dealTypesFailure(error.message));
  }
};
