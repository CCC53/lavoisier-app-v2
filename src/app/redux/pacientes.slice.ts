import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GlobalStore, PacienteStore } from "./store.types";
import { PacienteService } from "../api/services/paciente.service";
import { setLoading, setModalOpen, setSelectedRow, setTotalCount } from "./components.slice";

const initialState: PacienteStore = {
    pacientes: [],
    selectedPaciente: null,
    error: null
}
 
export const listPacientes = createAsyncThunk('pacientes/list', async(_, { getState, rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoading(true));
        const { components } = getState() as GlobalStore;
        const { pageSize, currentPage  } = components;
        const response = await PacienteService.listPacientes(currentPage, pageSize);
        dispatch(setTotalCount(response.totalCount));
        return response;
    } catch (error: any) {
        return rejectWithValue(error.message || 'Algo ha salido mal');
    } finally{
        dispatch(setLoading(false));
    }
});

export const findPaciente = createAsyncThunk('pacientes/find', async(id: string, { getState, rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoading(true));
        const response = await PacienteService.findPacienteById(id);
        return response;
    } catch (error: any) {
        return rejectWithValue(error.message || 'Algo ha salido mal');
    } finally {
        dispatch(setLoading(false));
    }
});

export const removePaciente = createAsyncThunk('pacientes/remove', async(_, { getState, rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoading(true));
        const { components } = getState() as GlobalStore;
        const { selectedRow } = components;
        if (selectedRow) {
            const response =  await PacienteService.removePaciente(selectedRow.id);
            response.removed && dispatch(listPacientes());
        }
    } catch (error: any) {
        return rejectWithValue(error.message || 'Algo ha salido mal');
    } finally {
        dispatch(setLoading(false));
        dispatch(setSelectedRow(null));
        dispatch(setModalOpen(false));
    }
});

export const pacienteSlice  = createSlice({
    name: 'pacientes',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(listPacientes.fulfilled, (state, action) => {
            setLoading(false);
            if (action.payload) {
                state.pacientes = action.payload.data;
                setTotalCount(action.payload.totalCount);
            }
        })
        // 
        .addCase(findPaciente.fulfilled, (state, action) => {
            setLoading(false);
            if (action.payload) {
                state.selectedPaciente = action.payload.data;
            }
        })
    }
});

export default pacienteSlice.reducer;