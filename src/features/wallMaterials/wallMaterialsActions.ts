import { AppDispatch } from "../../store/store";
import {
  wallMaterialsStart,
  wallMaterialsSuccess,
  wallMaterialsFailure,
} from "./wallMaterialsSlice";
import { apiRequest } from "../../utils/api";
import { ICommonType } from "../../types/types";

export const wallMaterialsProperties = () => async (dispatch: AppDispatch) => {
  dispatch(wallMaterialsStart());

  try {
    const response: ICommonType[] = await apiRequest(
      "GET",
      `/real-estate/wall-materials`
    );
    if (response?.length > 0) {
      dispatch(wallMaterialsSuccess(response));
    } else {
      dispatch(wallMaterialsSuccess(null));
    }
  } catch (error: any) {
    dispatch(wallMaterialsFailure(error.message));
  }
};
