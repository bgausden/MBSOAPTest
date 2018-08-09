// tslint:disable max-classes-per-file callable-types interface-over-type-literal

import * as core from "./core";
import * as defaults from "./defaults";
import * as mbsoap from "./mbsoap";

export type TMBSiteMethod =
    | "GetSites"
    | "GetLocations"
    | "GetActivationCode"
    | "GetPrograms"
    | "GetSessionTypes"
    | "GetResources"
    | "GetRelationships"
    | "GetGenders"
    | "GetProspectStages"
    | "GetMobileProviders";

export interface IGetResourcesParamsExternal {
    LocationIDs: number;
    SessionTypeIDs: number;
    StartDateTime: string;
    EndDateTime: string;
}

export interface IGetResourcesParamsInternal {
    locationid: number;
    sessiontypeids: number;
    startdatetime: Date;
    enddatetime: Date;
    toString?: () => IGetResourcesParamsExternal;
}

export interface IGetSitesParamsExternal {
    SearchText: string;
    RelatedSiteID: string;
}

export interface IGetSitesParamsInternal {
    searchText: string;
    relatedSiteID: string;
    toString?: () => IGetSitesParamsExternal;
}

export interface IResource {
    ID: number;
    Name: string;
}

export interface IResources {
    Resource: IResource[];
}

export interface IGetResourcesResult {
    Status: string;
    ErrorCode: number;
    XMLDetail: string;
    ResultCount: number;
    CurrentPageIndex: number;
    TotalPageCount: number;
    Resources: IResources;
}

export class CGetResourcesParams implements IGetResourcesParamsInternal {
    constructor(
        public locationid: number,
        public sessiontypeids: number,
        public startdatetime: Date,
        public enddatetime: Date
    ) {}
    public toString(): IGetResourcesParamsExternal {
        return {
            EndDateTime: this.enddatetime.toJSON(),
            LocationIDs: this.locationid,
            SessionTypeIDs: this.sessiontypeids,
            StartDateTime: this.startdatetime.toJSON()
        };
    }
}

export class CGetSitesParams implements IGetSitesParamsInternal {
    constructor(public searchText: string, public relatedSiteID: string) {}
    public toString(): IGetSitesParamsExternal {
        return {
            RelatedSiteID: this.relatedSiteID,
            SearchText: this.searchText
        };
    }
}

export const siteWSDLURL =
    "https://api.mindbodyonline.com/0_5_1/SiteService.asmx?wsdl";

export const defaultGetResourcesParams: IGetResourcesParamsExternal = new CGetResourcesParams(
    defaults.defaultLocationIDs,
    defaults.defaultSessionTypeIDs,
    defaults.midnight,
    defaults.midnight
).toString();

export const defaultGetResourcesRequest: mbsoap.TSoapRequest = {
    Request: Object.assign(
        defaultGetResourcesParams,
        defaults.defaultPagingParams
    )
};

export const defaultGetSitesParamsExternal: IGetSitesParamsExternal = new CGetSitesParams(
    defaults.defaultSearchText,
    defaults.defaultRelatedSiteID
).toString();

export const defaultGetSitesRequest: mbsoap.TSoapRequest = {
    Request: Object.assign(defaultGetSitesParamsExternal, defaults.defaultPagingParams)
};
