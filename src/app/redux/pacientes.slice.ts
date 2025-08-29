import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GlobalStore, PacienteStore } from "./store.types";
import { PacienteService } from "../api/services/paciente.service";

const initialState: PacienteStore = {
    pacientes: [],
    totalCount: 0,
    currentPage: 0,
    pageSize: 10,
    error: null,
    loading: false
}
 
export const list = createAsyncThunk('pacientes/list', async(_, { getState, rejectWithValue }) => {
    try {
        const { pacientes } = getState() as GlobalStore;
        const { pageSize, currentPage  } = pacientes;
        const response = await PacienteService.listPacientes(currentPage, pageSize);
        return response;
    } catch (error: any) {
        return rejectWithValue(error.message || 'Algo ha salido mal');
    }
});

export const pacienteSlice  = createSlice({
    name: 'pacientes',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(list.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(list.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload) {
                state.pacientes = action.payload.data;
                state.totalCount = action.payload.totalCount
            }
        })
        .addCase(list.rejected, (state, action) => {
            state.loading = false;
        })
    }
});

export const { setPage, setPageSize } = pacienteSlice.actions;
export default pacienteSlice.reducer;