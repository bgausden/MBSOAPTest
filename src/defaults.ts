import * as core from "./core";
import * as defaults from "./defaults";

export const MBAPIKey = "74b68c31704e40a69e9e60e1ef1de765";
export const midnight = new Date(new Date().setHours(0, 0, 0, 0));
export const now = new Date(Date.now());
export const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
export const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
export const defaultStartDate = yesterday;
export const defaultEndDate = tomorrow;
export const defaultLocationIDs = 0;
export const defaultSiteIDs = -99;
export const defaultUserPassword = "apitest1234";
export const defaultUsername = "Siteowner";
export const defaultIgnorePrepFinishTimes = false;
export const jonathanBolgerID = 100000296;
export const defaultStaffIDs = jonathanBolgerID;
export const defaultSessionTypeIDs = 1;
export const defaultSourceName = "LissomeHongKongLimited";
export const defaultSourcePassword = "oHmyTX0H/pciVoPW35pwahivDsE=";
export const defaultPageDetail: core.TXMLDetail = { XMLDetail: "Full" };
export const defaultPagingParams: core.TPagingParams = { CurrentPageIndex: 0, PageSize: 10 };
export const defaultSearchText: string  = "";
export const defaultRelatedSiteID: string = "";

export const defaultSourceCredentials: core.ISourceCredentialsExternal = new core.CSourceCredentials(
    defaults.defaultSourceName,
    defaults.defaultSourcePassword,
    defaults.defaultSiteIDs
).toString();

export const defaultUserCredentials = new core.CUserCredentials(
    defaults.defaultUsername,
    defaults.defaultUserPassword,
    defaults.defaultSiteIDs
).toString();

export const defaultStaffCredentials = new core.CStaffCredentials(
    defaults.defaultUsername,
    defaults.defaultUserPassword,
    defaults.defaultSiteIDs
).toString();