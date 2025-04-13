import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Panel } from "../data/data";
import axios from "axios";

interface PanelState {
  panels: Panel[];
  selectedPanel: Panel | null;
  loading: boolean;
  error: string | null;
}

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/panels`;

export const fetchPanels = createAsyncThunk<Panel[]>(
  "panel/fetchPanels",
  async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data.data;
  },
);

export const getPanelById = createAsyncThunk<Panel, string>(
  "panel/getPanelById",
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data;
  },
);

export const createPanel = createAsyncThunk<Panel, Partial<Panel>>(
  "panel/createPanel",
  async (panelData) => {
    const response = await axios.post(`${API_URL}/create`, panelData);
    return response.data.data;
  },
);

export const updatePanel = createAsyncThunk<
  Panel,
  { id: string; panelData: Partial<Panel> }
>("panel/updatePanel", async ({ id, panelData }) => {
  const response = await axios.put(`${API_URL}/${id}`, panelData);
  return response.data.data;
});

// Delete
export const deletePanel = createAsyncThunk<string, string>(
  "panel/deletePanel",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  },
);

// ========================
// SLICE
// ========================

const initialState: PanelState = {
  panels: [],
  selectedPanel: null,
  loading: false,
  error: null,
};

const panelSlice = createSlice({
  name: "panel",
  initialState,
  reducers: {
    clearSelectedPanel(state) {
      state.selectedPanel = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Panels
      .addCase(fetchPanels.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPanels.fulfilled, (state, action) => {
        state.loading = false;
        state.panels = action.payload;
      })
      .addCase(fetchPanels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })

      // Get Panel by ID
      .addCase(getPanelById.fulfilled, (state, action) => {
        state.selectedPanel = action.payload;
      })

      // Create Panel
      .addCase(createPanel.fulfilled, (state, action) => {
        state.panels.push(action.payload);
      })

      // Update Panel
      .addCase(updatePanel.fulfilled, (state, action) => {
        const index = state.panels.findIndex(
          (p) => p._id === action.payload._id,
        );
        if (index !== -1) {
          state.panels[index] = action.payload;
        }
      })

      // Delete Panel
      .addCase(deletePanel.fulfilled, (state, action) => {
        state.panels = state.panels.filter((p) => p._id !== action.payload);
      });
  },
});

export const { clearSelectedPanel } = panelSlice.actions;
export default panelSlice.reducer;
