import { IGetResourcesParamsExternal, IGetSitesParamsExternal } from "./site";

import { IGetScheduleItemsParamsExternal } from "./appointment";

import { IGetStaffParamsExternal } from "./staff";

// tslint:disable max-classes-per-file callable-types interface-over-type-literal

export type TSoapRequest = {
  Request:
    | IGetResourcesParamsExternal
    | IGetSitesParamsExternal
    | IGetScheduleItemsParamsExternal
    | IGetStaffParamsExternal;
};

export function wrapRequest(
  params: IGetResourcesParamsExternal | IGetScheduleItemsParamsExternal
): TSoapRequest {
  // return an Object with one property "Request" whose value is the param Object
  return { Request: params };
}
