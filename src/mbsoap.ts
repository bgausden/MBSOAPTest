import { IGetResourcesParamsExternal, IGetSitesParamsExternal, TSiteMethod } from "./site";

import { IGetScheduleItemsParamsExternal, TAppointmentMethod } from "./appointment";

import { IGetStaffParamsExternal, TStaffMethod } from "./staff";

export type TServiceMethod = TSiteMethod | TStaffMethod | TAppointmentMethod;

export type MethodParamsExternal =
| IGetResourcesParamsExternal
| IGetSitesParamsExternal
| IGetScheduleItemsParamsExternal
| IGetStaffParamsExternal;

export interface ISoapRequest {
  Request: MethodParamsExternal
}

export function wrapRequest(
  params: MethodParamsExternal
): ISoapRequest {
  // return an Object with one property "Request" whose value is the param Object
  return { Request: params };
}
