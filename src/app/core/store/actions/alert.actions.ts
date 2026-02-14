import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Alert } from "../../models/alert.model";

export const AlertActions = createActionGroup({
    source: 'Alert',
    events: {
        'Show Alert': props<{ alert: Alert }>(),
        'Dismiss Alert': props<{ id: string }>(),
        'Clear All Alerts': emptyProps(),
    }
});
