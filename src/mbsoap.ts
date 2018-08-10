// tslint:disable max-classes-per-file callable-types interface-over-type-literal
import * as appointment from "./appointment";
import * as site from "./site";
import * as staff from "./staff";

export type TSoapRequest = {
    Request:
        | site.IGetResourcesParamsExternal
        | site.IGetSitesParamsExternal
        | appointment.IGetScheduleItemsParamsExternal
        | staff.IGetStaffParamsExternal
};

export function wrapRequest( params: site.IGetResourcesParamsExternal | appointment.IGetScheduleItemsParamsExternal): TSoapRequest {
    // return an Object with one property "Request" whose value is the param Object
    return { Request: params };
}
