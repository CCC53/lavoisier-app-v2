import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GlobalStore, PagoStore } from "./store.types";
import { setLoading, setTotalCount } from "./components.slice";
import { PagosService } from "../api/services/pagos.service";
import { SelectService } from "../api/services/select.service";
import { PagoForm } from "../dashboard/pagos/pagos.types";

const initialState: PagoStore = {
    pagos: [],
    selectedPago: null,
    citasInput: []
}

export const listPagos = createAsyncThunk('pagos/list', async(_, { getState, rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoading(true));
        const { components } = getState() as GlobalStore;
        const { pageSize, currentPage  } = components;
        const response = await PagosService.listPagos(currentPage, pageSize);
        dispatch(setTotalCount(response.totalCount));
        return response;
    } catch (error: any) {
        rejectWithValue(error.message || 'Algo ha salido mal');
    } finally {
        dispatch(setLoading(false));
    }
});

export const findPagoByID = createAsyncThunk('pagos/findByID', async(id: string, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoading(true));
        const response = await PagosService.findByID(id);
        return response.data;
    } catch (error: any) {
        rejectWithValue(error.message || 'Algo ha salido mal');
    } finally {
        dispatch(setLoading(false));
    }
});

export const createPagoAction = createAsyncThunk('pagos/create', async(data: PagoForm, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoading(true));
        const response = await PagosService.createPago(data);
        return response.data;
    } catch (error: any) {
        rejectWithValue(error.message || 'Algo ha salido mal');
    } finally {
        dispatch(setLoading(false));
    }
});

export const listCitasInput = createAsyncThunk('pagos/listCitas', async(_, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoading(true));
        const response = await SelectService.listCitasOptions();
        return response;
    } catch (error: any) {
        rejectWithValue(error.message || 'Algo ha salido mal');
    } finally {
        dispatch(setLoading(false));
    }
});

export const pagoSlice = createSlice({
    name: 'pagos',
    initialState,
    reducers: {
        setSelectedPago: (state, action) => {
            state.selectedPago = action.payload;
        },
        filterDirect: (state, action) => {
            state.pagos = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(listPagos.fulfilled, (state, action) => {
            if (action.payload) {
                state.pagos = action.payload.data;
            }
        })
        // 
        builder.addCase(findPagoByID.fulfilled, (state, action) => {
            if (action.payload) {
                state.selectedPago = action.payload;
            }
        })
        // 
        builder.addCase(listCitasInput.fulfilled, (state, action) => {
            if (action.payload) {
                state.citasInput = action.payload;
            }
        })
        // 
        builder.addCase(createPagoAction.fulfilled, (state, action) => {
            if (action.payload) {
                state.selectedPago = action.payload;
            }
        })
    }
});

export const { setSelectedPago } = pagoSlice.actions;
export default pagoSlice.reducer;