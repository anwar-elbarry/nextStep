import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AlertState } from "../reducers/alert.reducer";

export const selectAlertState = createFeatureSelector<AlertState>('alerts');

export const selectAllAlerts = createSelector(
    selectAlertState,
    (state) => state.alerts
);
