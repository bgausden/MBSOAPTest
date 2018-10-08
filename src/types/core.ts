import { TAppointmentMethod } from "../appointment";
import {
  barePageDetail,
  basicPageDetail,
  fullPageDetail,
  TAppointment,
  TSite,
  TStaff
} from "../constants/core";
import {
  IGetResourcesResponse,
  IGetSitesResponse
} from "../interfaces/mb_site";
import { IGetStaffResponse } from "../interfaces/mb_staff";
import { IGetResourcesParamsExternal, TSiteMethod } from "../site";
import { TStaffMethod } from "../staff";

type fullPageDetail = typeof fullPageDetail;
type basicPageDetail = typeof basicPageDetail;
type barePageDetail = typeof barePageDetail;
export type TPageDetail = fullPageDetail | basicPageDetail | barePageDetail;

export type TServices = TSite | TAppointment | TStaff;
export type TServiceMethod = TSiteMethod | TStaffMethod | TAppointmentMethod;

export type TSoapResponse =
  | IGetStaffResponse
  | IGetSitesResponse
  | IGetResourcesResponse;

export type TStaffIDsInternal = number;
// tslint:disable interface-over-type-literal
export type TStaffIDsExternal = { StaffIDs: { long: TStaffIDsInternal } };

export type TLocationIDsInternal = number; // TODO this needs to be changed so we can input more than one locID
