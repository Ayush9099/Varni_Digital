import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Size } from "../data/data";
import axios from "axios";

interface sizeState {
  sizes: Size[];
  selectedSize: Size | null;
  loading: boolean;
  error: string | null;
}

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sizes`;

export const fetchsizes = createAsyncThunk<Size[]>(
  "size/fetchsizes",
  async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data.data;
  },
);

export const getsizeById = createAsyncThunk<Size, string>(
  "size/getsizeById",
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data;
  },
);

export const createsize = createAsyncThunk<Size, Partial<Size>>(
  "size/createsize",
  async (sizeData) => {
    const response = await axios.post(`${API_URL}/create`, sizeData);
    return response.data.data;
  },
);

export const updatesize = createAsyncThunk<
Size,
  { id: string; sizeData: Partial<Size> }
>("size/updatesize", async ({ id, sizeData }) => {
  const response = await axios.put(`${API_URL}/${id}`, sizeData);
  return response.data.data;
});

// Delete
export const deletesize = createAsyncThunk<string, string>(
  "size/deletesize",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  },
);

// ========================
// SLICE
// ========================

const initialState: sizeState = {
  sizes: [],
  selectedSize: null,
  loading: false,
  error: null,
};

const sizeSlice = createSlice({
  name: "size",
  initialState,
  reducers: {
    clearSelectedsize(state) {
      state.selectedSize = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch sizes
      .addCase(fetchsizes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchsizes.fulfilled, (state, action) => {
        state.loading = false;
        state.sizes = action.payload;
      })
      .addCase(fetchsizes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })

      // Get size by ID
      .addCase(getsizeById.fulfilled, (state, action) => {
        state.selectedSize = action.payload;
      })

      // Create size
      .addCase(createsize.fulfilled, (state, action) => {
        state.sizes.push(action.payload);
      })

      // Update size
      .addCase(updatesize.fulfilled, (state, action) => {
        const index = state.sizes.findIndex(
          (p) => p._id === action.payload._id,
        );
        if (index !== -1) {
          state.sizes[index] = action.payload;
        }
      })

      // Delete size
      .addCase(deletesize.fulfilled, (state, action) => {
        state.sizes = state.sizes.filter((p) => p._id !== action.payload);
      });
  },
});

export const { clearSelectedsize } = sizeSlice.actions;
export default sizeSlice.reducer;
