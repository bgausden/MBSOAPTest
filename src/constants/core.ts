import { config } from "node-config-ts";
import { CStaffCredentials, CStaffIDs, CUserCredentials } from "../classes/core";
import { CLocationIDs, IPagingParams, IStaffCredentialsInternal, IUserCredentialsInternal, IXMLDetail } from "../interfaces/core";
import { TSiteID } from "../types/site";

const localeDateStringOptions = {
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    month: "long",
    weekday: "long"
  };
  const options = {
    disableCache: false
  };

// MindBody Soap Services
export const Site = "Site";
// export type TSite = typeof Site;
export const Appointment = "Appointment";
// export type TAppointment = typeof Appointment;
export const Staff = "Staff";
// export type TStaff = typeof Staff;

// MindBody SOAP Page Detail
export const fullPageDetail = "Full"
export const basicPageDetail = "Basic"
export const barePageDetail = "Bare"
export const defaultPageDetail: IXMLDetail = { XMLDetail: fullPageDetail };
export const defaultPagingParams: IPagingParams = {
    CurrentPageIndex: 0,
    PageSize: 10
  };

// Times and dates
// MB SOAP API requires all dates to be expressed as Date.toJSON(). toString and friends won't work.
export const midnight = new Date(new Date().setHours(0, 0, 0, 0));
export const now = new Date(Date.now());
export const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
export const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
export const defaultStartDate = yesterday;
export const defaultEndDate = tomorrow;

// Sites and Locations
export const defaultLocationID = 0;
export const defaultLocationIDs = new CLocationIDs(defaultLocationID); // LocationIDs are supposed to be an array of Locations but MB seems inconsistent in this regard.
export const defaultSiteIDs: TSiteID = config.SiteIDs;
export const defaultRelatedSiteID: string = "";

// Users
export const defaultUserPassword = config.UserPassword;
export const defaultUsername = config.UserName;
  export const defaultUserCredentials: IUserCredentialsInternal = new CUserCredentials(
    defaultUsername,
    defaultUserPassword,
    defaultSiteIDs
  );

// Staff
export const defaultStaffIDs = new CStaffIDs(config.StaffID);
export const defaultStaffCredentials: IStaffCredentialsInternal = new CStaffCredentials(
    defaultUsername,
    defaultUserPassword,
    defaultSiteIDs
  );

// MB SOAP Credentials
// API Key for HTTP Header based Source Credentials (supercedes use of SourceCredentials in SOAP requests)
export const AuthAPIKeyHeader = "API-key";
export const AuthSiteIDHeader = "SiteID";
export const AuthSiteID = config.SiteIDs;

// Misc
export const defaultSessionTypeIDs = 1;
export const defaultSearchText: string = "Sandbox";


