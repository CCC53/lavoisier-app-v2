import { configureStore } from "@reduxjs/toolkit";
import { pacienteSlice } from "./pacientes.slice";
import { componentsSlice } from "./components.slice";

export const store = configureStore({
    reducer: {
        pacientes: pacienteSlice.reducer,
        components: componentsSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;