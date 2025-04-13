import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface SubModule {
  _id: string;
  name: string;
  price: number;
}

export interface Accessories {
  _id: string;
  modularType: string;
  subModules: SubModule[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface AccessoriesState {
  accessories: Accessories[];
  selectedAccessory: Accessories | null;
  loading: boolean;
  error: string | null;
}

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/accessories`;

// Thunks
export const fetchAccessories = createAsyncThunk<Accessories[]>(
  "accessories/fetchAccessories",
  async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data.data;
  },
);

export const getAccessoryById = createAsyncThunk<Accessories, string>(
  "accessories/getAccessoryById",
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data;
  },
);

export const createAccessory = createAsyncThunk<
  Accessories,
  Partial<Accessories>
>("accessories/createAccessory", async (accessoryData) => {
  const response = await axios.post(`${API_URL}/create`, accessoryData);
  return response.data.data;
});

export const updateAccessory = createAsyncThunk<
  Accessories,
  { id: string; accessoryData: Partial<Accessories> }
>("accessories/updateAccessory", async ({ id, accessoryData }) => {
  const response = await axios.put(`${API_URL}/${id}`, accessoryData);
  return response.data.data;
});

export const deleteAccessory = createAsyncThunk<string, string>(
  "accessories/deleteAccessory",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  },
);

// Initial State
const initialState: AccessoriesState = {
  accessories: [],
  selectedAccessory: null,
  loading: false,
  error: null,
};

// Slice
const accessoriesSlice = createSlice({
  name: "accessories",
  initialState,
  reducers: {
    clearSelectedAccessory(state) {
      state.selectedAccessory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchAccessories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAccessories.fulfilled, (state, action) => {
        state.loading = false;
        state.accessories = action.payload;
      })
      .addCase(fetchAccessories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })

      // Get by ID
      .addCase(getAccessoryById.fulfilled, (state, action) => {
        state.selectedAccessory = action.payload;
      })

      // Create
      .addCase(createAccessory.fulfilled, (state, action) => {
        state.accessories.push(action.payload);
      })

      // Update
      .addCase(updateAccessory.fulfilled, (state, action) => {
        const index = state.accessories.findIndex(
          (a) => a._id === action.payload._id,
        );
        if (index !== -1) {
          state.accessories[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteAccessory.fulfilled, (state, action) => {
        state.accessories = state.accessories.filter(
          (a) => a._id !== action.payload,
        );
      });
  },
});

export const { clearSelectedAccessory } = accessoriesSlice.actions;
export default accessoriesSlice.reducer;
