import { IReport } from '@/models/reports';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { selectUserId } from '../user';

// Define a type for the slice state
interface ReportsState {
  reports: IReport[];
}

// Define the initial state using that type
const initialState: ReportsState = {
  reports: [],
};

export const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setReports: (state, action: PayloadAction<IReport[]>) => ({
      ...state,
      reports: action.payload,
    }),
  },
});

export const { setReports } = reportsSlice.actions;

export const selectAllReports = (state: RootState) => state.reports.reports;

export const selectReportsOfLoggedUser = createSelector(
  [selectAllReports, selectUserId],
  (reports: IReport[], userId: string): IReport[] =>
    reports.filter((report) => report.ownerId === userId),
);
export const selectReportById = (reportId: number) =>
  createSelector(
    [selectAllReports],
    (reports: IReport[]): IReport | undefined =>
      reports.find((report) => report.id === reportId),
  );

export default reportsSlice.reducer;
