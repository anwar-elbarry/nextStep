import { createReducer, on } from "@ngrx/store";
import { Alert } from "../../models/alert.model";
import { AlertActions } from "../actions/alert.actions";

export interface AlertState {
    alerts: Alert[];
}

export const initialState: AlertState = {
    alerts: [],
};

export const alertReducer = createReducer(
    initialState,

    on(AlertActions.showAlert, (state, { alert }) => ({
        ...state,
        alerts: [...state.alerts, alert],
    })),

    on(AlertActions.dismissAlert, (state, { id }) => ({
        ...state,
        alerts: state.alerts.filter(alert => alert.id !== id),
    })),

    on(AlertActions.clearAllAlerts, (state) => ({
        ...state,
        alerts: [],
    }))
);
