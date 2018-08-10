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

export interface IGetStaffParamsExternal {
  StaffIDs?: number;
  StaffCredentials: core.IStaffCredentialsExternal;
  Filters?: string;
  SessionTypeID?: number;
  StartDateTime?: string;
  LocationID?: number;
  Fields?: string;
}

export interface IGetStaffParamsInternal {
  lStaffIDs?: number;
  StaffCredentials: core.IStaffCredentialsInternal;
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
    public StaffCredentials: core.IStaffCredentialsInternal,
    public lStaffIDs?: number,
    public Filters?: string,
    public SessionTypeID?: number,
    public StartDateTime?: string,
    public LocationID?: number,
    public Fields?: string
  ) {}
  public toString(): IGetStaffParamsExternal {
    const staffCreds = new core.CStaffCredentials(
      this.StaffCredentials.username,
      this.StaffCredentials.password,
      this.StaffCredentials.siteids
    );
    const paramsExternal = { StaffCredentials: staffCreds.toString() };
    if (this.lStaffIDs !== undefined) {
      Object.assign(paramsExternal, { StaffIDs: this.lStaffIDs });
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

export const defaultGetStaffParams: IGetStaffParamsExternal = new CGetStaffParams(
  defaults.defaultStaffCredentials,  
).toString();

export const defaultGetStaffRequest: mbsoap.TSoapRequest = {
  Request: Object.assign(defaultGetStaffParams, defaults.defaultLocationIDs,defaults.defaultUserCredentials, defaults.defaultPagingParams)
};
