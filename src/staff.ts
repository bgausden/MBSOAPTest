// tslint:disable max-classes-per-file callable-types

// interface-over-type-literal

import { ISoapMethod } from "soap";
import { Category } from "typescript-logging";
import { CStaffCredentials, CStaffIDs } from "./classes/core";
import { Staff } from "./constants/core";
import * as defaults from "./defaults";
import { defaultStaffIDs } from "./defaults";
import {
  IStaffCredentialsInternal,
  IStaffIDsInternal
} from "./interfaces/core";
import * as mbsoap from "./mb_soap";
import { createSoapClientAsync } from "./mbsoaptest";
import { CReminder } from "./reminder";
import { TServices } from "./types/core";
import { catGetStaff, catStaff, catUnknown } from "./typescript-logging-config";

export const GetStaff = "GetStaff";
type TGetStaff = typeof GetStaff;

export const GetStaffPermissions = "GetStaffPermissions";
type TGetStaffPermissions = typeof GetStaffPermissions;

export const AddOrUpdateStaff = "AddOrUpdateStaff";
type TAddOrUpdateStaff = typeof AddOrUpdateStaff;

export const GetStaffImgURL = "GetStaffImgURL";
type TGetStaffImgURL = typeof GetStaffImgURL;

export const ValidateStaffLogin = "ValidateStaffLogin";
type TValidateStaffLogin = typeof ValidateStaffLogin;

export type TStaffMethod =
  | TGetStaff
  | TGetStaffPermissions
  | TAddOrUpdateStaff
  | TGetStaffImgURL
  | TValidateStaffLogin;

export interface IGetStaffParamsExternal {
  StaffCredentials?: IStaffCredentialsInternal;
  StaffIDs?: { long: number };
  Filters?: { string: string };
  SessionTypeID?: number;
  StartDateTime?: string;
  LocationID?: number;
  Fields?: string;
}

interface IGetStaffParamsInternal {
  StaffIDs?: CStaffIDs;
  StaffCredentials?: IStaffCredentialsInternal;
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

interface IAddOrUpdateStaffParamsInternal {
  Test?: boolean;
  UpdateAction: string;
  Staff: number;
  toString?: () => IAddOrUpdateStaffParamsExternal;
}

export class CGetStaffParams implements IGetStaffParamsInternal {
  constructor(
    public StaffCredentials?: IStaffCredentialsInternal,
    public StaffIDs?: CStaffIDs,
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
      paramsExternal = new CStaffCredentials(
        this.StaffCredentials.username,
        this.StaffCredentials.password,
        this.StaffCredentials.siteids
      ).toString();
    }
    if (this.StaffIDs !== undefined) {
      Object.assign(
        paramsExternal,
        new CStaffIDs(this.StaffIDs.StaffIDs).toString()
      );
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



/* export const defaultGetStaffParams: IGetStaffParamsExternal = new CGetStaffParams(
  defaults.defaultStaffCredentials,
  defaults.defaultStaffIDs
).toString(); */

// contrary to the documentation there are no mandatory params for Staff.GetStaff()
// export const defaultGetStaffParams: IGetStaffParamsExternal = {};
export const defaultGetStaffParams: IGetStaffParamsExternal = new CGetStaffParams(
  undefined,
  undefined,
).toString();

export const defaultGetStaffRequest: mbsoap.ISoapRequest = {
  Request: Object.assign(
    defaultGetStaffParams,
    defaults.defaultLocationIDs,
    defaults.defaultUserCredentials,
    defaults.defaultPagingParams
  )
};
