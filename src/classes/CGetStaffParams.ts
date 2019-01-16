import {
  IGetStaffParamsExternal,
  IGetStaffParamsInternal
} from "src/interfaces/staff";
import { IStaffCredentialsInternal } from "../interfaces/core";
import { CStaffCredentials, CStaffIDs } from "./core";

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
