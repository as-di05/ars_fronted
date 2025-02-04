import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "../features/counter/counterSlice";
import currentUserReducer from "../features/users/currentUserSlice";
import searchRealEstateReducer from "../features/searchRealEstate/searchRealEstateSlice";
import districtsReducer from "../features/districts/districtsSlice";
import dealTypesReducer from "../features/dealTypes/dealTypesSlice";
import reSeriesReducer from "../features/reSeries/reSeriesSlice";
import reHeatingsReducer from "../features/reHeatings/reHeatingsSlice";
import wallMaterialsReducer from "../features/wallMaterials/wallMaterialsSlice";
import documentsReducer from "../features/reDocuments/documentsSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    currentUser: currentUserReducer,
    searchRealEstate: searchRealEstateReducer,
    districts: districtsReducer,
    dealTypes: dealTypesReducer,
    reSeries: reSeriesReducer,
    reHeatings: reHeatingsReducer,
    wallMaterials: wallMaterialsReducer,
    documents: documentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
