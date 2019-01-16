import { IStaffCredentialsInternal } from "./core";

import { CStaffIDs } from "src/classes/core";

export interface IGetStaffParamsExternal {
    StaffCredentials?: IStaffCredentialsInternal;
    StaffIDs?: { long: number };
    Filters?: { string: string };
    SessionTypeID?: number;
    StartDateTime?: string;
    LocationID?: number;
    Fields?: string;
  }

  export interface IGetStaffParamsInternal {
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
