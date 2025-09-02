import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CitaStore, GlobalStore } from "./store.types";
import { setLoading, setModalOpen, setSelectedRow, setTotalCount } from "./components.slice";
import { CitaService } from "../api/services/cita.service";
import { SelectService } from "../api/services/select.service";
import { CitaForm } from "../dashboard/citas/cita.types";

const initialState: CitaStore = {
    citas: [],
    pacientesInput: [],
    selectedCita: null
}

export const listCitas = createAsyncThunk('citas/list', async(_, { getState, rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoading(true));
        const { components } = getState() as GlobalStore;
        const { pageSize, currentPage  } = components;
        const response = await CitaService.listCitas(currentPage, pageSize);
        dispatch(setTotalCount(response.totalCount));
        return response;
    } catch (error: any) {
        rejectWithValue(error.message || 'Algo ha salido mal');
    } finally {
        dispatch(setLoading(false));
    }
});

export const listPacientesInput = createAsyncThunk('citas/listPacientes', async(_, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoading(true));
        const response = await SelectService.listPacientesOptions();
        return response;
    } catch (error: any) {
        rejectWithValue(error.message || 'Algo ha salido mal');
    } finally {
        dispatch(setLoading(false));
    }
});

export const findCita = createAsyncThunk('citas/find', async(id: string, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoading(true));
        const response = await CitaService.findCitaById(id);
        return response.data;
    } catch (error: any) {
        rejectWithValue(error.message || 'Algo ha salido mal');
    } finally {
        dispatch(setLoading(false));
    }
});

export const createCita = createAsyncThunk('citas/create', async(data: CitaForm, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoading(true));
        const response = await CitaService.createCita(data);
        return response.data;
    } catch (error: any) {
        rejectWithValue(error.message || 'Algo ha salido mal');
    } finally {
        dispatch(setLoading(false));
    }
});

export const updateCita = createAsyncThunk('citas/update', async(data: CitaForm, { getState, rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoading(true));
        const { citas } = getState() as GlobalStore;
        const { selectedCita } = citas;
        if (selectedCita) {
            const response = await CitaService.updateCita(selectedCita.id, data);
            return response.data;
        }
        return null;
    } catch (error: any) {
        rejectWithValue(error.message || 'Algo ha salido mal');
    } finally {
        dispatch(setLoading(false));
    }
});

export const removeCita = createAsyncThunk('citas/remove', async(_, { rejectWithValue, getState, dispatch }) => {
    try {
        dispatch(setLoading(true));
        const { components, citas } = getState() as GlobalStore;
        const { citas: data } = citas;
        const { selectedRow } = components;
        if (selectedRow) {
            dispatch({ type: 'citas/filterDirect', payload: data.filter(item => item.id !== selectedRow.id) })
            const response = await CitaService.removeCita(selectedRow.id);
            response.removed && dispatch(listCitas());
        }
    } catch (error: any) {
        rejectWithValue(error.message || 'Algo ha salido mal');
    } finally {
        dispatch(setLoading(false));
        dispatch(setSelectedRow(null));
        dispatch(setModalOpen(false));
    }
});

export const citaSlice = createSlice({
    name: 'citas',
    initialState,
    reducers: {
        setSelectedCita: (state, action) => {
            state.selectedCita = action.payload;
        },
        filterDirect: (state, action) => {
            state.citas = action.payload;
        }
    },
    extraReducers: (builder => {
        builder.addCase(listCitas.fulfilled, (state, action) => {
            if (action.payload) {
                state.citas = action.payload.data;
            }
        })
        // 
        .addCase(findCita.fulfilled, (state, action) => {
            if (action.payload) {
                state.selectedCita = action.payload;
            }
        })
        // 
        .addCase(listPacientesInput.fulfilled, (state, action) => {
            if (action.payload) {
                state.pacientesInput = action.payload;
            }
        })
        // 
        .addCase(createCita.fulfilled, (state, action) => {
            if (action.payload) {
                state.selectedCita = action.payload;
            }
        })
        // 
        .addCase(updateCita.fulfilled, (state, action) => {
            if (action.payload) {
                state.selectedCita = action.payload;
            }
        })
    })
});

export const { setSelectedCita } = citaSlice.actions;
export default citaSlice.reducer;