import { configureStore } from "@reduxjs/toolkit";
import { pacienteSlice } from "./pacientes.slice";

export const store = configureStore({
    reducer: {
        pacientes: pacienteSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;