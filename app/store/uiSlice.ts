import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarOpen: boolean;
  activeTab: string;
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

const initialState: UIState = {
  sidebarOpen: true,
  activeTab: 'overview',
  dateRange: {
    startDate: '2025-01-22',
    endDate: '2025-02-22',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setDateRange: (
      state,
      action: PayloadAction<{ startDate: string; endDate: string }>
    ) => {
      state.dateRange = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, setActiveTab, setDateRange } =
  uiSlice.actions;
export default uiSlice.reducer;
