import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface SubModule {
  _id: string;
  name: string;
  price: number;
}

export interface Color {
  _id: string;
  modularType: string;
  subModules: SubModule[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface colorState {
  color: Color[];
  selectedColor: Color | null;
  loading: boolean;
  error: string | null;
}

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/color`;

// Thunks
export const fetchColor = createAsyncThunk<Color[]>(
  "color/fetchColor",
  async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data.data;
  },
);

export const getColorById = createAsyncThunk<Color, string>(
  "color/getColorById",
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data;
  },
);

export const createColor = createAsyncThunk<
  Color,
  Partial<Color>
>("color/createColor", async (colorData) => {
  const response = await axios.post(`${API_URL}/create`, colorData);
  return response.data.data;
});

export const updateColor = createAsyncThunk<
  Color,
  { id: string; ColorData: Partial<Color> }
>("color/updateColor", async ({ id, ColorData }) => {
  const response = await axios.put(`${API_URL}/${id}`, ColorData);
  return response.data.data;
});

export const deleteColor = createAsyncThunk<string, string>(
  "color/deleteColor",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  },
);


const initialState: colorState = {
  color: [],
  selectedColor: null,
  loading: false,
  error: null,
};

// Slice
const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    clearSelectedColor(state) {
      state.selectedColor = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchColor.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchColor.fulfilled, (state, action) => {
        state.loading = false;
        state.color = action.payload;
      })
      .addCase(fetchColor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })

      // Get by ID
      .addCase(getColorById.fulfilled, (state, action) => {
        state.selectedColor = action.payload;
      })

      // Create
      .addCase(createColor.fulfilled, (state, action) => {
        state.color.push(action.payload);
      })

      // Update
      .addCase(updateColor.fulfilled, (state, action) => {
        const index = state.color.findIndex(
          (a) => a._id === action.payload._id,
        );
        if (index !== -1) {
          state.color[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.color = state.color.filter(
          (a) => a._id !== action.payload,
        );
      });
  },
});

export const { clearSelectedColor } = colorSlice.actions;
export default colorSlice.reducer;
