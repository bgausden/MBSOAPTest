import { IGetScheduleItemsParamsExternal } from "src/interfaces/appointment";
import { IGetResourcesParamsExternal, IGetSitesParamsExternal } from "src/interfaces/site";
import { IGetStaffParamsExternal } from "src/interfaces/staff";
import {
  barePageDetail,
  basicPageDetail,
  fullPageDetail
} from "../constants/core";
import {
  IGetResourcesResponse,
  IGetSitesResponse
} from "../interfaces/mb_site";
import { IGetStaffResponse } from "../interfaces/mb_staff";
import { TAppointmentMethod } from "./appointment";
import { TSiteMethod } from "./site";
import { TStaffMethod } from "./staff";

type fullPageDetail = typeof fullPageDetail;
type basicPageDetail = typeof basicPageDetail;
type barePageDetail = typeof barePageDetail;
export type TPageDetail = fullPageDetail | basicPageDetail | barePageDetail;

export type TServices = "Site" | "Appointment" | "Staff";
export type TServiceMethod = TSiteMethod | TStaffMethod | TAppointmentMethod;

export type TSoapResponse =
  | IGetStaffResponse
  | IGetSitesResponse
  | IGetResourcesResponse;

export type TStaffIDsInternal = string;
// tslint:disable interface-over-type-literal
export type TStaffIDsExternal = { StaffIDs: { long: TStaffIDsInternal } };

export type TLocationIDsInternal = number; // TODO this needs to be changed so we can input more than one locID

export type TServiceMethodParamsExternal =
| IGetResourcesParamsExternal
| IGetSitesParamsExternal
| IGetScheduleItemsParamsExternal
| IGetStaffParamsExternal;
