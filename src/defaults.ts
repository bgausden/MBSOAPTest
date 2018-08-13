import * as core from "./core";
import * as defaults from "./defaults";

export const MBAPIKey = "74b68c31704e40a69e9e60e1ef1de765";
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
export const defaultStaffID = jonathanBolgerID;
export const defaultStaffIDs = new core.CStaffIDs(defaultStaffID);
export const defaultSessionTypeIDs = 1;
export const defaultSourceName = "LissomeHongKongLimited";
export const defaultSourcePassword = "oHmyTX0H/pciVoPW35pwahivDsE=";
export const defaultPageDetail: core.TXMLDetail = { XMLDetail: "Full" };
export const defaultPagingParams: core.TPagingParams = { CurrentPageIndex: 0, PageSize: 10 };
export const defaultSearchText: string  = "Sandbox";
export const defaultRelatedSiteID: string = "";

export const defaultSourceCredentials: core.ISourceCredentialsInternal = new core.CSourceCredentials(
    defaults.defaultSourceName,
    defaults.defaultSourcePassword,
    defaults.defaultSiteIDs
);

export const defaultUserCredentials: core.IUserCredentialsInternal = new core.CUserCredentials(
    defaults.defaultUsername,
    defaults.defaultUserPassword,
    defaults.defaultSiteIDs
);

export const defaultStaffCredentials: core.IStaffCredentialsInternal = new core.CStaffCredentials(
    defaults.defaultUsername,
    defaults.defaultUserPassword,
    defaults.defaultSiteIDs
);

export const defaultLocationIDs: core.ILocationIDsInternal = new core.CLocationIDs(
    defaults.defaultLocationID,
);