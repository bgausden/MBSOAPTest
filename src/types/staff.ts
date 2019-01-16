import { AddOrUpdateStaff, GetStaff, GetStaffImgURL, GetStaffPermissions, ValidateStaffLogin } from "src/constants/staff";
import { IStaff } from "../interfaces/mb_staff";

export type TStaffID = IStaff["ID"]; // Use the type for "ID" returned by the MB SOAP Interface for the the ID member of the Staff interface
export type TFirstName = IStaff["FirstName"];
export type TLastName = IStaff["LastName"];
type TGetStaff = typeof GetStaff;

type TGetStaffPermissions = typeof GetStaffPermissions;

type TAddOrUpdateStaff = typeof AddOrUpdateStaff;

type TGetStaffImgURL = typeof GetStaffImgURL;

type TValidateStaffLogin = typeof ValidateStaffLogin;

export type TStaffMethod =
  | TGetStaff
  | TGetStaffPermissions
  | TAddOrUpdateStaff
  | TGetStaffImgURL
  | TValidateStaffLogin;
