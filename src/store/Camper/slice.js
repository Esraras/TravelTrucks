import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers, fetchCamperById } from "./operations";

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    currentCamper: null,
    loading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 6,
    filters: {
      location: "",
      equipment: [],
      type: [],
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.currentPage = 1;
    },
    clearFilters: (state) => {
      state.items = [];
      state.filters = {
        location: "",
        equipment: [],
        type: [],
      };
      state.currentPage = 1;
      state.total = 0;
    },
    clearError: (state) => {
      state.error = null;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    nextPage: (state) => {
      const totalPages = Math.ceil(state.items.length / state.itemsPerPage);
      if (state.currentPage < totalPages) {
        state.currentPage += 1;
      }
    },
    prevPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;
        if (action.meta.arg.page === 1) {
          state.items = action.payload.items;
        } else {
          state.items = [...state.items, ...action.payload.items];
        }
        state.total = action.payload.total;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchCamperById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCamper = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setFilters,
  clearFilters,
  clearError,
  setPage,
  nextPage,
  prevPage,
} = campersSlice.actions;

export default campersSlice.reducer;
