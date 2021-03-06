import { CSourceCredentials, CStaffCredentials, CStaffIDs, CUserCredentials } from "./classes/core";
import * as defaults from "./defaults";
import { CLocationIDs, ISourceCredentialsInternal, IStaffCredentialsInternal, IUserCredentialsInternal } from "./interfaces/core";
import { IPagingParams, IXMLDetail } from "./interfaces/core";

export const MBAPIKey = "74b68c31704e40a69e9e60e1ef1de765";
// MB SOAP API requires all dates to be expressed as Date.toJSON(). toString and friends won't work.
export const midnight = new Date(new Date().setHours(0, 0, 0, 0));
export const now = new Date(Date.now());
export const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
export const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
export const defaultStartDate = yesterday;
export const defaultEndDate = tomorrow;
export const defaultLocationID = 0;
export const defaultSiteIDs = -99;
export const defaultUserPassword = "apitest1234";
export const defaultUsername = "Siteowner";
export const defaultIgnorePrepFinishTimes = false;
export const jonathanBolgerID = 100000296;
export const siteOwnerID = 0;
export const defaultStaffID = siteOwnerID;
export const defaultStaffIDs = new CStaffIDs(defaultStaffID);
export const defaultSessionTypeIDs = 1;
export const defaultSourceName = "LissomeHongKongLimited";
export const defaultSourcePassword = "oHmyTX0H/pciVoPW35pwahivDsE=";
export const defaultPageDetail: IXMLDetail = { XMLDetail: "Full" };
export const defaultPagingParams: IPagingParams = { CurrentPageIndex: 0, PageSize: 10 };
export const defaultSearchText: string  = "Sandbox";
export const defaultRelatedSiteID: string = "";

export const defaultSourceCredentials: ISourceCredentialsInternal = new CSourceCredentials(
    defaults.defaultSourceName,
    defaults.defaultSourcePassword,
    defaults.defaultSiteIDs
);

export const defaultUserCredentials: IUserCredentialsInternal = new CUserCredentials(
    defaults.defaultUsername,
    defaults.defaultUserPassword,
    defaults.defaultSiteIDs
);

export const defaultStaffCredentials: IStaffCredentialsInternal = new CStaffCredentials(
    defaults.defaultUsername,
    defaults.defaultUserPassword,
    defaults.defaultSiteIDs
);

export const defaultLocationIDs = new CLocationIDs(
    defaults.defaultLocationID,
);
