import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./store.types";

const initialState: AuthState = {
    token: null
} 

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        }
    }
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;