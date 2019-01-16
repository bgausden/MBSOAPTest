import { IGetStaffParamsExternal } from "../interfaces/staff";

import { CGetStaffParams } from "../classes/CGetStaffParams";

import { ISoapRequest } from "../interfaces/core";

import { defaultLocationIDs, defaultPagingParams, defaultUserCredentials } from "./core";

export const GetStaff = "GetStaff";
export const GetStaffPermissions = "GetStaffPermissions";
export const AddOrUpdateStaff = "AddOrUpdateStaff";
export const GetStaffImgURL = "GetStaffImgURL";
export const ValidateStaffLogin = "ValidateStaffLogin";

// contrary to the documentation there are no mandatory params for Staff.GetStaff()
// export const defaultGetStaffParams: IGetStaffParamsExternal = {};
export const defaultGetStaffParams: IGetStaffParamsExternal = new CGetStaffParams(
    undefined,
    undefined,
  ).toString();

  export const defaultGetStaffRequest: ISoapRequest = {
    Request: Object.assign(
      defaultGetStaffParams,
      defaultLocationIDs,
      defaultUserCredentials,
      defaultPagingParams
    )
  };
