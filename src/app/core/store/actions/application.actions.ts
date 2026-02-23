import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ApplicationModel } from "../../../features/applications/models/applicationResp.model";
import { ApplicationReqModel } from "../../../features/applications/models/applicationReq.model";

export const ApplicationActions = createActionGroup({
    source: 'Application',
    events: {
        'Load Applications': emptyProps(),
        'Load Applications Success': props<{ applications: ApplicationModel[] }>(),
        'Load Applications Failure': props<{ error: string }>(),
        'Add Application': props<{ application: ApplicationReqModel }>(),
        'Add Application Success': props<{ application: ApplicationModel }>(),
        'Add Application Failure': props<{ error: string }>(),
        'Update Application': props<{ applicationId: string, application: ApplicationReqModel }>(),
        'Update Application Success': props<{ application: ApplicationModel }>(),
        'Update Application Failure': props<{ error: string }>(),
        'Delete Application': props<{ applicationId: string }>(),
        'Delete Application Success': props<{ applicationId: string }>(),
        'Delete Application Failure': props<{ error: string }>(),
    }
});