import * as core from "./core";
import * as defaults from "./defaults";
import { TSoapRequest } from "./mbsoap";

export type TMBAppointmentMethod = "GetStaffAppointments" | "GetScheduleItems";

export const appointmentWSDLURL =
  "https://api.mindbodyonline.com/0_5_1/AppointmentService.asmx?wsdl";

export interface IGetAppointmentsParamsInternal {
  LocationIDs: number;
  StaffIDs: core.IStaffIDsInternal;
  StartDateTime: Date;
  EndDateTime: Date;
  IgnorePrepFinishTimes: boolean;
}

export interface IGetStaffAppointmentsParamsExternal {
  LocationIDs: { int: number };
  StaffIDs: core.IStaffIDsInternal;
  StartDate: string;
  EndDate: string;
  IgnorePrepFinishTimes: boolean;
}

export interface IGetScheduleItemsParamsExternal {
  LocationIDs: { int: number };
  StaffIDs: core.TStaffIDs;
  StartDate: string;
  EndDate: string;
  IgnorePrepFinishTimes: boolean;
}

export class CGetScheduleItemsParams implements IGetAppointmentsParamsInternal {
  constructor(
    public LocationIDs: number,
    public StaffIDs: core.CStaffIDs,
    public StartDateTime: Date,
    public EndDateTime: Date,
    public IgnorePrepFinishTimes: boolean
  ) {}
  public toString(): IGetScheduleItemsParamsExternal {
    return Object.assign(
      {
        EndDate: this.EndDateTime.toJSON(),
        IgnorePrepFinishTimes: this.IgnorePrepFinishTimes,
        LocationIDs: { int: this.LocationIDs },
        StartDate: this.StartDateTime.toJSON()
      },
      this.StaffIDs.toString()
    );
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
  )
};

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
