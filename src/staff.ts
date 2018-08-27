// tslint:disable max-classes-per-file callable-types interface-over-type-literal

import * as core from "./core";
import * as defaults from "./defaults";
import * as mbsoap from "./mbsoap";

export type TMBStaffMethod =
  | "GetStaff"
  | "GetStaffPermissions"
  | "AddOrUpdateStaff"
  | "GetStaffImgURL"
  | "ValidateStaffLogin";

  export interface IStaff {
    SortOrder: number;
    AppointmentTrn: boolean;
    ReservationTrn: boolean;
    IndependentContractor: boolean;
    AlwaysAllowDoubleBooking: boolean;
    ID: string;
    Name: string;
    FirstName: string;
    LastName: string;
    ImageURL: string;
    isMale: boolean;
  }
  
export interface IGetStaffParamsExternal {
  StaffCredentials?: core.IStaffCredentialsInternal;
    StaffIDs?: { long: number };
  Filters?: { string: string };
  SessionTypeID?: number;
  StartDateTime?: string;
  LocationID?: number;
  Fields?: string;
}

export interface IGetStaffParamsInternal {
  StaffIDs?: core.IStaffIDsInternal;
  StaffCredentials?: core.IStaffCredentialsInternal;
  Filters?: string;
  SessionTypeID?: number;
  StartDateTime?: string;
  LocationID?: number;
  Fields?: string;
  toString?: () => IGetStaffParamsExternal;
}

export interface IAddOrUpdateStaffParamsExternal {
  Test?: boolean;
  UpdateAction: string;
  Staff: number;
}

export interface IAddOrUpdateStaffParamsInternal {
  Test?: boolean;
  UpdateAction: string;
  Staff: number;
  toString?: () => IAddOrUpdateStaffParamsExternal;
}

export class CGetStaffParams implements IGetStaffParamsInternal {
  constructor(
    public StaffCredentials?: core.IStaffCredentialsInternal,
    public StaffIDs?: core.IStaffIDsInternal,
    public Filters?: string,
    public SessionTypeID?: number,
    public StartDateTime?: string,
    public LocationID?: number,
    public Fields?: string
  ) {}
  public toString(): IGetStaffParamsExternal {
    // minimal GetStaff params are one set of staff credentials
    // initialise the GetStaff params with a staff credentials object
    // can do this because minimum params === a staff credentials object
    let paramsExternal = {};

    if (this.StaffCredentials !== undefined) {
      paramsExternal = new core.CStaffCredentials(
        this.StaffCredentials.username,
        this.StaffCredentials.password,
        this.StaffCredentials.siteids
      ).toString();
    }
    if (this.StaffIDs !== undefined) {
      Object.assign(paramsExternal, new core.CStaffIDs(this.StaffIDs.StaffIDs).toString());
    }
    if (this.Filters !== undefined) {
      Object.assign(paramsExternal, { Filters: this.Filters });
    }
    if (this.SessionTypeID !== undefined) {
      Object.assign(paramsExternal, { SessionTypeID: this.SessionTypeID });
    }
    if (this.StartDateTime !== undefined) {
      Object.assign(paramsExternal, { StartDateTime: this.StartDateTime });
    }
    if (this.LocationID !== undefined) {
      Object.assign(paramsExternal, { StartDateTime: this.StartDateTime });
    }
    if (this.Fields !== undefined) {
      Object.assign(paramsExternal, { Fields: this.Fields });
    }
    return paramsExternal;
  }
}

export const staffWSDLURL =
  "https://api.mindbodyonline.com/0_5_1/StaffService.asmx?wsdl";

/* export const defaultGetStaffParams: IGetStaffParamsExternal = new CGetStaffParams(
  defaults.defaultStaffCredentials,
  defaults.defaultStaffIDs
).toString(); */

// contrary to the documentation there are no mandatory params for Staff.GetStaff()
// export const defaultGetStaffParams: IGetStaffParamsExternal = {};
export const defaultGetStaffParams: IGetStaffParamsExternal = new CGetStaffParams(undefined, defaults.defaultStaffIDs).toString();

export const defaultGetStaffRequest: mbsoap.TSoapRequest = {
  Request: Object.assign(
    defaultGetStaffParams,
    defaults.defaultLocationIDs,
    defaults.defaultUserCredentials,
    defaults.defaultPagingParams
  )
};
