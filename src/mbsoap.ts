import { IGetResourcesParamsExternal, IGetSitesParamsExternal } from "./site";

import { IGetScheduleItemsParamsExternal } from "./appointment";

import { IGetStaffParamsExternal } from "./staff";

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
