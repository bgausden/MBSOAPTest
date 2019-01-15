// Contains types, interfaces, classes and functions related to how we interact with the MB SOAP API
// Does not include anything that describes the MB SOAP API — only how we interact with the API (e.g. helpers, conveniences)

import { IGetResourcesParamsExternal, IGetSitesParamsExternal, TSiteMethod } from "./site";

import { IGetScheduleItemsParamsExternal, TAppointmentMethod } from "./appointment";

import { IGetStaffParamsExternal, TStaffMethod } from "./staff";

// export type TServiceMethod = TSiteMethod | TStaffMethod | TAppointmentMethod; exported from ./types/core.ts

export type MethodParamsExternal =
| IGetResourcesParamsExternal
| IGetSitesParamsExternal
| IGetScheduleItemsParamsExternal
| IGetStaffParamsExternal;

// ISoapRequest is an object with a single member "Request". The value is an object containing the request parameters. We pass this to the SOAP library
export interface ISoapRequest {
  Request: MethodParamsExternal
}

export function wrapRequest(
  params: MethodParamsExternal
): ISoapRequest {
  // return an object with one property "Request" whose value is the param Object
  return { Request: params };
}
