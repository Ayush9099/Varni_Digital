import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Material } from "../data/data";
import axios from "axios";

interface materialState {
  materials: Material[];
  selectedMaterial: Material | null;
  loading: boolean;
  error: string | null;
}

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/material`;

export const fetchMaterials = createAsyncThunk<Material[]>(
  "material/fetchMaterials",
  async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data.data;
  },
);

export const getMaterialById = createAsyncThunk<Material, string>(
  "material/getMaterialById",
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data;
  },
);

export const createMaterial = createAsyncThunk<Material, Partial<Material>>(
  "material/createMaterial",
  async (materialData) => {
    const response = await axios.post(`${API_URL}/create`, materialData);
    return response.data.data;
  },
);

export const updateMaterial = createAsyncThunk<
Material,
  { id: string; materialData: Partial<Material> }
>("material/updateMaterial", async ({ id, materialData }) => {
  const response = await axios.put(`${API_URL}/${id}`, materialData);
  return response.data.data;
});

// Delete
export const deletematerial = createAsyncThunk<string, string>(
  "material/deletematerial",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  },
);

// ========================
// SLICE
// ========================

const initialState: materialState = {
  materials: [],
  selectedMaterial: null,
  loading: false,
  error: null,
};

const materialSlice = createSlice({
  name: "material",
  initialState,
  reducers: {
    clearSelectedmaterial(state) {
      state.selectedMaterial = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch materials
      .addCase(fetchMaterials.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.materials = action.payload;
      })
      .addCase(fetchMaterials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })

      // Get material by ID
      .addCase(getMaterialById.fulfilled, (state, action) => {
        state.selectedMaterial = action.payload;
      })

      // Create material
      .addCase(createMaterial.fulfilled, (state, action) => {
        state.materials.push(action.payload);
      })

      // Update material
      .addCase(updateMaterial.fulfilled, (state, action) => {
        const index = state.materials.findIndex(
          (p) => p._id === action.payload._id,
        );
        if (index !== -1) {
          state.materials[index] = action.payload;
        }
      })

      // Delete material
      .addCase(deletematerial.fulfilled, (state, action) => {
        state.materials = state.materials.filter((p) => p._id !== action.payload);
      });
  },
});

export const { clearSelectedmaterial } = materialSlice.actions;
export default materialSlice.reducer;
