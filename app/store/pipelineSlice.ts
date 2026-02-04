import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PipelineRun {
  id: string;
  dataSource: string;
  status: 'success' | 'failed' | 'running';
  recordsProcessed: number;
  timestamp: string;
  duration: number;
}

interface PipelineState {
  runs: PipelineRun[];
  ingestionMetrics: {
    totalPublications: number;
    successRate: number;
    pipelineHealth: number;
  };
  dataSources: Array<{
    name: string;
    volume: number;
    growth?: number;
  }>;
  loading: boolean;
}

const initialState: PipelineState = {
  runs: [],
  ingestionMetrics: {
    totalPublications: 0,
    successRate: 0,
    pipelineHealth: 0,
  },
  dataSources: [],
  loading: false,
};

const pipelineSlice = createSlice({
  name: 'pipeline',
  initialState,
  reducers: {
    setPipelineRuns: (state, action: PayloadAction<PipelineRun[]>) => {
      state.runs = action.payload;
    },
    setIngestionMetrics: (
      state,
      action: PayloadAction<{
        totalPublications: number;
        successRate: number;
        pipelineHealth: number;
      }>
    ) => {
      state.ingestionMetrics = action.payload;
    },
    setDataSources: (
      state,
      action: PayloadAction<Array<{ name: string; volume: number }>>
    ) => {
      state.dataSources = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setPipelineRuns, setIngestionMetrics, setDataSources, setLoading } =
  pipelineSlice.actions;
export default pipelineSlice.reducer;
