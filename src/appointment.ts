import * as defaults from "./defaults";
import { TSoapRequest } from "./mbsoap";

export type TMBAppointmentMethod = "GetStaffAppointments" | "GetScheduleItems";

export const appointmentWSDLURL =
    "https://api.mindbodyonline.com/0_5_1/AppointmentService.asmx?wsdl";

export interface IGetAppointmentsParamsInternal {
    locationIDs: number;
    staffIDs: number;
    startDateTime: Date;
    endDateTime: Date;
    ignorePrepFinishTimes: boolean;
}

export interface IGetScheduleItemsParamsExternal {
    LocationIDs: { int: number };
    StaffIDs: { long: number };
    StartDate: string;
    EndDate: string;
    IgnorePrepFinishTimes: boolean;
}

export interface IGetStaffAppointmentsParamsExternal {
    LocationIDs: { int: number };
    StaffIDs: { long: number };
    StartDate: string;
    EndDate: string;
    IgnorePrepFinishTimes: boolean;
}

export class CGetScheduleItemsParams implements IGetAppointmentsParamsInternal {
    constructor(
        public locationIDs: number,
        public staffIDs: number,
        public startDateTime: Date,
        public endDateTime: Date,
        public ignorePrepFinishTimes: boolean
    ) {}
    public toString(): IGetScheduleItemsParamsExternal {
        return {
            EndDate: this.endDateTime.toJSON(),
            IgnorePrepFinishTimes: this.ignorePrepFinishTimes,
            LocationIDs: { int: this.locationIDs },
            StaffIDs: { long: this.staffIDs },
            StartDate: this.startDateTime.toJSON()
        };
    }
}

export const defaultGetScheduleItemsParams: IGetScheduleItemsParamsExternal = new CGetScheduleItemsParams(
    defaults.defaultLocationIDs,
    defaults.defaultStaffIDs,
    defaults.defaultStartDate,
    defaults.defaultEndDate,
    defaults.defaultIgnorePrepFinishTimes
).toString();

// required getScheduleItems args appear to be SourceCredentials + UserCredentials + PagingDetails + DetailLevel
// + StaffIDs + LocationID + (optional) StartDate + (optional) EndDate
// note this is *not* consistent with the MB documentation but empirically, this is what works
export const defaultGetScheduleItemsRequest: TSoapRequest = {
    Request: Object.assign(
    defaults.defaultSourceCredentials,
    defaults.defaultUserCredentials,
    defaults.defaultPagingParams,
    defaults.defaultPageDetail,
    defaultGetScheduleItemsParams
    // looks like specifying "Fields" isn't supported by the getScheduleItems call
    /* {
    Fields: {string: "ResultCount"}
  } */
)};

/* export const defaultGetStaffAppointmentsArgs: IGetStaffAppointmentsParamsExternal = Object.assign(
    defaults.defaultStaffCredentials,
    defaults.defaultSourceCredentials,
    defaults.defaultUserCredentials,
    defaultGetScheduleItemsParams,
    defaults.defaultPagingParams,
    defaults.defaultPageDetail
); */

export const defaultGetStaffAppointmentsRequest: TSoapRequest = {
    Request: Object.assign(
        defaults.defaultStaffCredentials,
        defaults.defaultSourceCredentials,
        defaults.defaultUserCredentials,
        defaultGetScheduleItemsParams,
        defaults.defaultPagingParams,
        defaults.defaultPageDetail
    )
};
