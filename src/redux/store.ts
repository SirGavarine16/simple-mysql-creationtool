import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import { formsReducer, optionsReducer } from "./slice";

const store = configureStore({
    reducer: {
        options: optionsReducer,
        forms: formsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export default store;