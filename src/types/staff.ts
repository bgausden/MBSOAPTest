import { IStaff } from "../interfaces/mb_staff";

export type TStaffID = IStaff["ID"]; // Use the type for "ID" returned by the MB SOAP Interface for the the ID member of the Staff interface
export type TFirstName = IStaff["FirstName"];
export type TLastName = IStaff["LastName"];
