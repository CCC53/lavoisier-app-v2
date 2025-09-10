import { configureStore } from "@reduxjs/toolkit";
import { pacienteSlice } from "./pacientes.slice";
import { componentsSlice } from "./components.slice";
import { citaSlice } from "./citas.slice";
import { pagoSlice } from "./pago.slice";

export const store = configureStore({
    reducer: {
        pacientes: pacienteSlice.reducer,
        components: componentsSlice.reducer,
        citas: citaSlice.reducer,
        pagos: pagoSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;