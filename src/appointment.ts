import * as core from "./core";
import * as defaults from "./defaults";
import { TSoapRequest } from "./mbsoap";

export type TMBAppointmentMethod = "GetStaffAppointments" | "GetScheduleItems";

export const appointmentWSDLURL =
  "https://api.mindbodyonline.com/0_5_1/AppointmentService.asmx?wsdl";

interface IGetAppointmentsParamsInternal {
  LocationIDs: number;
  StaffIDs: core.IStaffIDsInternal;
  StartDateTime: Date;
  EndDateTime: Date;
  IgnorePrepFinishTimes: boolean;
}

interface IGetStaffAppointmentsParamsExternal {
  LocationIDs: { int: number };
  StaffIDs: core.IStaffIDsInternal;
  StartDate: string;
  EndDate: string;
  IgnorePrepFinishTimes: boolean;
}

export interface IGetScheduleItemsParamsExternal {
  LocationIDs?: { int: number };
  StaffIDs?: core.TStaffIDsExternal;
  StartDate?: string;
  EndDate?: string;
  IgnorePrepFinishTimes?: boolean;
}

interface IGetScheduleItemsParamsInternal {
  LocationIDs?: core.CLocationIDs;
  StaffIDs?: core.CStaffIDs;
  StartDate?: Date;
  EndDate?: Date;
  IgnorePrepFinishTimes?: boolean;
  toString: () => IGetScheduleItemsParamsExternal;
}

 class CGetScheduleItemsParams
  implements IGetScheduleItemsParamsInternal {
  constructor(
    public LocationIDs?: core.CLocationIDs,
    public StaffIDs?: core.CStaffIDs,
    public StartDate?: Date,
    public EndDate?: Date,
    public IgnorePrepFinishTimes?: boolean
  ) {}
  public toString(): IGetScheduleItemsParamsExternal {
    const params = {};
    if (this.LocationIDs !== undefined) {Object.assign(params,{LocationIDs: this.LocationIDs.toString()})};
    if (this.StaffIDs !== undefined) {Object.assign(params,{StaffIDs: this.StaffIDs.toString()})};
    if (this.StartDate !== undefined) {Object.assign(params, {StartDate: this.StartDate.toJSON()})};
    if (this.EndDate !== undefined) {Object.assign(params, {EndDate: this.EndDate.toJSON()})};
    if (this.IgnorePrepFinishTimes !== undefined) {Object.assign(params, {IgnorePrepFinishTimes: JSON.stringify(this.IgnorePrepFinishTimes)})};
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
  // defaults.defaultLocationIDs,
  undefined,
  defaults.defaultStaffIDs,
  // defaults.defaultStartDate,
  defaults.now,
  // defaults.defaultEndDate,
  defaults.tomorrow,
  // defaults.defaultIgnorePrepFinishTimes,
  undefined,
).toString();

// required getScheduleItems args appear to be SourceCredentials + UserCredentials + PagingDetails + DetailLevel
// + StaffIDs + LocationID + (optional) StartDate + (optional) EndDate
// note this is *not* consistent with the MB documentation but empirically, this is what works
export const defaultGetScheduleItemsRequest: TSoapRequest = {
  Request: Object.assign(
    defaults.defaultSourceCredentials.toString(),
    defaults.defaultUserCredentials.toString(),
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
    defaults.defaultStaffCredentials.toString(),
    defaults.defaultSourceCredentials.toString(),
    defaults.defaultUserCredentials.toString(),
    defaultGetScheduleItemsParams,
    defaults.defaultPagingParams,
    defaults.defaultPageDetail,
    defaults.defaultStaffIDs.toString()
  )
};
