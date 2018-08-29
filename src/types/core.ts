import { barePageDetail, basicPageDetail, fullPageDetail, TAppointment, TSite, TStaff } from "../constants/core";

type fullPageDetail = typeof fullPageDetail;

type basicPageDetail = typeof basicPageDetail

type barePageDetail = typeof barePageDetail

export type TPageDetail = fullPageDetail | basicPageDetail | barePageDetail;

export type TServices = TSite | TAppointment | TStaff;
export type TStaffIDsInternal = number;
export type TLocationIDsInternal = number; // TODO this needs to be changed so we can input more than one locID
export type TStaffIDsExternal = {StaffIDs: {long: TStaffIDsInternal}};
