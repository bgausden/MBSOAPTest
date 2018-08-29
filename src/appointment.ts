// Imports
import { IClient } from "./client";
import {
    CLocationIDs,
    CStaffIDs,
    IStaffIDsInternal,
    TStaffIDsExternal
} from "./core";
import {
    defaultPageDetail,
    defaultPagingParams,
    defaultSourceCredentials,
    defaultStaffCredentials,
    defaultStaffIDs,
    defaultUserCredentials,
    now,
    tomorrow
} from "./defaults";
import { TSoapRequest } from "./mbsoap";
import { IProgram, IResources, ISessionType } from "./site";
import { IStaff } from "./staff";

export const GetStaffAppointments = "GetStaffAppointments";
export type GetStaffAppointments = typeof GetStaffAppointments;

export const GetScheduleItems = "GetScheduleItems";
export type GetScheduleItems = typeof GetScheduleItems;

export type TMBAppointmentMethod = GetStaffAppointments | GetScheduleItems;
export const appointmentWSDLURL =
    "https://api.mindbodyonline.com/0_5_1/AppointmentService.asmx?wsdl";

    export interface IAppointment {
    [key: string]: any;
    ID: string;
    Status: string;
    StartDateTime: Date;
    EndDateTime: Date;
    Notes: string;
    StaffRequested: boolean;
    Program: IProgram;
    SessionType: ISessionType;
    Location: Location;
    Staff: IStaff;
    Client: IClient;
    FirstAppointment: boolean;
    Resources: IResources;
}

export interface IGetStaffAppointmentsResult {
    GetStaffAppointmentsResult: {
        Appointments: {
            Appointment: IAppointment[];
        };
    };
}

interface IGetAppointmentsParamsInternal {
    LocationIDs: number;
    StaffIDs: IStaffIDsInternal;
    StartDateTime: Date;
    EndDateTime: Date;
    IgnorePrepFinishTimes: boolean;
}

interface IGetStaffAppointmentsParamsExternal {
    LocationIDs: { int: number };
    StaffIDs: IStaffIDsInternal;
    StartDate: string;
    EndDate: string;
    IgnorePrepFinishTimes: boolean;
}

export interface IGetScheduleItemsParamsExternal {
    LocationIDs?: { int: number };
    StaffIDs?: TStaffIDsExternal;
    StartDate?: string;
    EndDate?: string;
    IgnorePrepFinishTimes?: boolean;
}

interface IGetScheduleItemsParamsInternal {
    LocationIDs?: CLocationIDs;
    StaffIDs?: CStaffIDs;
    StartDate?: Date;
    EndDate?: Date;
    IgnorePrepFinishTimes?: boolean;
    toString: () => IGetScheduleItemsParamsExternal;
}

class CGetScheduleItemsParams implements IGetScheduleItemsParamsInternal {
    constructor(
        public LocationIDs?: CLocationIDs,
        public StaffIDs?: CStaffIDs,
        public StartDate?: Date,
        public EndDate?: Date,
        public IgnorePrepFinishTimes?: boolean
    ) { }
    public toString(): IGetScheduleItemsParamsExternal {
        const params = {};
        if (this.LocationIDs !== undefined) {
            Object.assign(params, { LocationIDs: this.LocationIDs.toString() });
        }
        if (this.StaffIDs !== undefined) {
            Object.assign(params, { StaffIDs: this.StaffIDs.toString() });
        }
        if (this.StartDate !== undefined) {
            Object.assign(params, { StartDate: this.StartDate.toJSON() });
        }
        if (this.EndDate !== undefined) {
            Object.assign(params, { EndDate: this.EndDate.toJSON() });
        }
        if (this.IgnorePrepFinishTimes !== undefined) {
            Object.assign(params, {
                IgnorePrepFinishTimes: JSON.stringify(this.IgnorePrepFinishTimes)
            });
        }
        return params;

        /* TODO there should be a way to iterate through the props and then do the assignment.    
       for (const p of this) {
          if (this[p] !== undefined) {
            params = Object.assign(params, this[p]);
          }
        } */
    }
}

const defaultGetScheduleItemsParams: IGetScheduleItemsParamsExternal = new CGetScheduleItemsParams(
    // defaultLocationIDs,
    undefined,
    defaultStaffIDs,
    // defaultStartDate,
    now,
    // defaultEndDate,
    tomorrow,
    // defaultIgnorePrepFinishTimes,
    undefined
).toString();

// required getScheduleItems args appear to be SourceCredentials + UserCredentials + PagingDetails + DetailLevel
// + StaffIDs + LocationID + (optional) StartDate + (optional) EndDate
// note this is *not* consistent with the MB documentation but empirically, this is what works
export const defaultGetScheduleItemsRequest: TSoapRequest = {
    Request: Object.assign(
        defaultSourceCredentials.toString(),
        defaultUserCredentials.toString(),
        defaultPagingParams,
        defaultPageDetail,
        defaultGetScheduleItemsParams
    )
};

/* export const defaultGetStaffAppointmentsArgs: IGetStaffAppointmentsParamsExternal = Object.assign(
    defaultStaffCredentials,
    defaultSourceCredentials,
    defaultUserCredentials,
    defaultGetScheduleItemsParams,
    defaultPagingParams,
    defaultPageDetail
); */

export const defaultGetStaffAppointmentsRequest: TSoapRequest = {
    Request: Object.assign(
        defaultStaffCredentials.toString(),
        defaultSourceCredentials.toString(),
        defaultUserCredentials.toString(),
        defaultGetScheduleItemsParams,
        defaultPagingParams,
        defaultPageDetail,
        defaultStaffIDs.toString()
    )
};
