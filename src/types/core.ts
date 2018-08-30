import { TMBAppointmentMethod } from "../appointment";
import {
  barePageDetail,
  basicPageDetail,
  fullPageDetail,
  TAppointment,
  TSite,
  TStaff
} from "../constants/core";
import { TSiteMethod } from "../site";
import { TMBStaffMethod } from "../staff";

type fullPageDetail = typeof fullPageDetail;
type basicPageDetail = typeof basicPageDetail;
type barePageDetail = typeof barePageDetail;
export type TPageDetail = fullPageDetail | basicPageDetail | barePageDetail;

export type TServices = TSite | TAppointment | TStaff;
export type TServiceMethod =
  | TSiteMethod
  | TMBStaffMethod
  | TMBAppointmentMethod;

export type TStaffIDsInternal = number;
// tslint:disable interface-over-type-literal
export type TStaffIDsExternal = { StaffIDs: { long: TStaffIDsInternal } };

export type TLocationIDsInternal = number; // TODO this needs to be changed so we can input more than one locID
