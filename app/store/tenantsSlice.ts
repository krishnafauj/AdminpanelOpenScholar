import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Tenant {
  id: string;
  name: string;
  environment: 'dev' | 'staging' | 'prod';
  status: 'active' | 'inactive';
  publicationsCount: number;
  configStatus: 'synced' | 'pending' | 'error';
}

interface TenantsState {
  items: Tenant[];
  loading: boolean;
  error: string | null;
}

const initialState: TenantsState = {
  items: [],
  loading: false,
  error: null,
};

const tenantsSlice = createSlice({
  name: 'tenants',
  initialState,
  reducers: {
    setTenants: (state, action: PayloadAction<Tenant[]>) => {
      state.items = action.payload;
      state.error = null;
    },
    addTenant: (state, action: PayloadAction<Tenant>) => {
      state.items.push(action.payload);
    },
    updateTenant: (state, action: PayloadAction<Tenant>) => {
      const index = state.items.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setTenants, addTenant, updateTenant, setLoading, setError } = tenantsSlice.actions;
export default tenantsSlice.reducer;
