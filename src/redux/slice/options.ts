import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CreationOption } from "../../types";

interface OptionsState {
    creationOption: CreationOption;
}

const initialState: OptionsState = {
    creationOption: 'db',
}

const optionsSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
        setCreationOption(state, action: PayloadAction<CreationOption>) {
            state.creationOption = action.payload;
        },
    }
});

export const {
    setCreationOption,
} = optionsSlice.actions;

export default optionsSlice.reducer;