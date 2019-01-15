// tslint:disable max-classes-per-file callable-types

// interface-over-type-literal

import { ISoapMethod } from "soap";
import { Category } from "typescript-logging";
import { CStaffCredentials, CStaffIDs } from "./classes/core";
import { CReminder } from "./classes/CReminder";
import { Staff } from "./constants/core";
import * as defaults from "./defaults";
import { defaultStaffIDs } from "./defaults";
import {
  IStaffCredentialsInternal,
  IStaffIDsInternal
} from "./interfaces/core";
import * as mbsoap from "./mb_soap";
import { createSoapClientAsync } from "./request";
import { TServices } from "./types/core";
import { catGetStaff, catStaff, catUnknown } from "./typescript-logging-config";

export const GetStaff = "GetStaff";
type TGetStaff = typeof GetStaff;

export const GetStaffPermissions = "GetStaffPermissions";
type TGetStaffPermissions = typeof GetStaffPermissions;

export const AddOrUpdateStaff = "AddOrUpdateStaff";
type TAddOrUpdateStaff = typeof AddOrUpdateStaff;

export const GetStaffImgURL = "GetStaffImgURL";
type TGetStaffImgURL = typeof GetStaffImgURL;

export const ValidateStaffLogin = "ValidateStaffLogin";
type TValidateStaffLogin = typeof ValidateStaffLogin;

export type TStaffMethod =
  | TGetStaff
  | TGetStaffPermissions
  | TAddOrUpdateStaff
  | TGetStaffImgURL
  | TValidateStaffLogin;

export interface IGetStaffParamsExternal {
  StaffCredentials?: IStaffCredentialsInternal;
  StaffIDs?: { long: number };
  Filters?: { string: string };
  SessionTypeID?: number;
  StartDateTime?: string;
  LocationID?: number;
  Fields?: string;
}

interface IGetStaffParamsInternal {
  StaffIDs?: CStaffIDs;
  StaffCredentials?: IStaffCredentialsInternal;
  Filters?: string;
  SessionTypeID?: number;
  StartDateTime?: string;
  LocationID?: number;
  Fields?: string;
  toString?: () => IGetStaffParamsExternal;
}

export interface IAddOrUpdateStaffParamsExternal {
  Test?: boolean;
  UpdateAction: string;
  Staff: number;
}

interface IAddOrUpdateStaffParamsInternal {
  Test?: boolean;
  UpdateAction: string;
  Staff: number;
  toString?: () => IAddOrUpdateStaffParamsExternal;
}

export class CGetStaffParams implements IGetStaffParamsInternal {
  constructor(
    public StaffCredentials?: IStaffCredentialsInternal,
    public StaffIDs?: CStaffIDs,
    public Filters?: string,
    public SessionTypeID?: number,
    public StartDateTime?: string,
    public LocationID?: number,
    public Fields?: string
  ) {}
  public toString(): IGetStaffParamsExternal {
    // minimal GetStaff params are one set of staff credentials
    // initialise the GetStaff params with a staff credentials object
    // can do this because minimum params === a staff credentials object
    let paramsExternal = {};

    if (this.StaffCredentials !== undefined) {
      paramsExternal = new CStaffCredentials(
        this.StaffCredentials.username,
        this.StaffCredentials.password,
        this.StaffCredentials.siteids
      ).toString();
    }
    if (this.StaffIDs !== undefined) {
      Object.assign(
        paramsExternal,
        new CStaffIDs(this.StaffIDs.StaffIDs).toString()
      );
    }
    if (this.Filters !== undefined) {
      Object.assign(paramsExternal, { Filters: this.Filters });
    }
    if (this.SessionTypeID !== undefined) {
      Object.assign(paramsExternal, { SessionTypeID: this.SessionTypeID });
    }
    if (this.StartDateTime !== undefined) {
      Object.assign(paramsExternal, { StartDateTime: this.StartDateTime });
    }
    if (this.LocationID !== undefined) {
      Object.assign(paramsExternal, { StartDateTime: this.StartDateTime });
    }
    if (this.Fields !== undefined) {
      Object.assign(paramsExternal, { Fields: this.Fields });
    }
    return paramsExternal;
  }
}



/* export const defaultGetStaffParams: IGetStaffParamsExternal = new CGetStaffParams(
  defaults.defaultStaffCredentials,
  defaults.defaultStaffIDs
).toString(); */

// contrary to the documentation there are no mandatory params for Staff.GetStaff()
// export const defaultGetStaffParams: IGetStaffParamsExternal = {};
export const defaultGetStaffParams: IGetStaffParamsExternal = new CGetStaffParams(
  undefined,
  undefined,
).toString();

export const defaultGetStaffRequest: mbsoap.ISoapRequest = {
  Request: Object.assign(
    defaultGetStaffParams,
    defaults.defaultLocationIDs,
    defaults.defaultUserCredentials,
    defaults.defaultPagingParams
  )
};
/*
// TODO change staffID to the type used in MB
// TODO initialize staffCache with staff info from MB
const staffID: string = "";
type TstaffID = typeof staffID;
// export const staffCache:Map<TstaffID, number> = new Map<TstaffID, number>();

export class CStaffCache {
  private staffCache: object = {};
  constructor() {
    this.initialize();
  }
  public initialize() {
    this.staffCache = {
      Anson: 2,
      Ari: 2,
      Rennie: 0,
      Rex: 2,
      Yentl: 1
    };
    const staffPromise = createSoapClientAsync(staffWSDLURL);
    const service = Staff;
    const serviceMethod = GetStaff;
    const request = defaultGetStaffRequest;
    const parentCategory = catStaff;
    const loggingCategory = new Category("cat" + serviceMethod, parentCategory);
    staffPromise.then(client => {
        const soapMethod = client[serviceMethod] as ISoapMethod;
        soapMethod(request, (err, result) => {
          // console.log(`err: \n\n${JSON.stringify(err, undefined, 2)}`);
          // console.log(`result: \n\n${JSON.stringify(result, undefined, 2)}`);
          if (err) {
            loggingCategory.debug(
              // @ts-ignore TS2345:
              () => `\n\nlastRequest: \n\n${xmlformat(client.lastRequest)}\n`
            );
            throw new Error(JSON.stringify(err));
          } else {
            loggingCategory.debug(
              // @ts-ignore TS2345:
              () => `\n\nlastRequest: \n\n${xmlformat(client.lastRequest)}\n`
            );
            loggingCategory.debug(
              () => `\n\nresult: \n\n${JSON.stringify(result, undefined, 2)}\n`
            );
            handleResult(service, serviceMethod, result);
          }
        });
    });
  }
}

function handleResult(
    svc: TServices,
    svcMethod: TStaffMethod,
    result: any
  ): void {
    switch (svc) {
      case Staff:
        switch (svcMethod as string) {
          case GetStaff:
            catGetStaff.debug(
              () =>
                `\n\nAppointments: \n\n${prettyjson.render(
                  result.GetStaffResult.Appointments
                )}\n\n`
            );
            catGetStaff.debug(
              () => "Loading Appointments into Cache"
            );
            const reminderCache = new Map<string, CReminder>();
            result = result as IGetStaffResult;
            result.GetStaffResult.Appointments.Appointment.forEach(
              (element: IAppointment) => {
                const key = element.ID;
                const reminder = new CReminder(
                  element.ID,
                  element.Client.UniqueID,
                  element.Client.FirstName,
                  element.Client.LastName,
                  element.Status,
                  element.SessionType.Name,
                  element.StaffID,
                  element.Staff.FirstName,
                  element.StartDateTime
                );
                reminderCache.set(key, reminder);
                catGetStaff.debug(
                  () => `\n\n${prettyjson.render(reminder)}`
                );
              }
            );
            reminderCache.forEach(reminder => {
              if (reminder.Status !== Confirmed) {
                  // TODO Find the first appointment for the day. Send reminder for this appt only.
                  // TODO If there are two appts with same time, send reminder for stylist, not assistant.
                  let reminderID = reminder.ID;
                  let staffMember = reminder.StaffFirstName;
                  let clUID = reminder.ClientUniqueID;
                  let earliestReminder:Date = new Date;
                  reminderCache.forEach(r => {
                      if (r.ID !== reminderID) {
                          if (r.ClientUniqueID === clUID) {
                              // another reminder for the same client
                              if (r.StartDateTime.getTime() === reminder.StartDateTime.getTime()) {
                                  if (staffPrecedence(r.StaffID < staffPrecedence(reminder.StaffID))) {
                                      reminderCache.delete(r.ID)
                                  }
                              }
                          }
                      }
                  });
                catGetStaff.debug(() =>
                  reminder.toWhatsAppURI()
                );
              }
            });
            break;

          default:
            const errString: string =
              "Currently not able to process " + " " + svc + ":" + svcMethod;
            catUnknown.debug(() => errString);
            throw new Error(errString);
            break;
        }
        break;

      default:
        break;
    }
  }
export function initializeStaffCache() {
  const staffCache = new Map<string, string>();
}
 */
