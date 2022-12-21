import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TableFieldData } from "../../interfaces/forms";

interface FormsState {
    result: string;
    tableFields: TableFieldData[];
}

const initialState: FormsState = {
    result: '',
    tableFields: []
}

const formsSlice = createSlice({
    name: 'forms',
    initialState,
    reducers: {
        setResult(state, action: PayloadAction<string>) {
            state.result = action.payload;
        },
        setTableFields(state, action: PayloadAction<TableFieldData[]>) {
            state.tableFields = action.payload;
        }
    }
});

export const {
    setResult,
    setTableFields,
} = formsSlice.actions;

export default formsSlice.reducer;