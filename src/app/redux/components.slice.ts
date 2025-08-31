import { createSlice } from "@reduxjs/toolkit";
import { ComponentStore } from "./store.types";

const initialState: ComponentStore = {
    totalCount: 0,
    currentPage: 0,
    pageSize: 10,
    loading: false,
    modalOpen: false,
    selectedRow: null
}

export const componentsSlice = createSlice({
    name: 'components',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setTotalCount: (state, action) => {
            state.totalCount = action.payload;
        },
        setModalOpen: (state, action) => {
            state.modalOpen = action.payload;
        },
        setSelectedRow: (state, action) => {
            state.selectedRow = action.payload;
        }
    }
});

export const { setPage, setPageSize, setLoading, setTotalCount, setModalOpen, setSelectedRow } = componentsSlice.actions;
export default componentsSlice.reducer;