import { configureStore } from '@reduxjs/toolkit';
import tenantsReducer from './tenantsSlice';
import pipelineReducer from './pipelineSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    tenants: tenantsReducer,
    pipeline: pipelineReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
