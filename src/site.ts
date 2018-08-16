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
  LocationIDs: core.TLocationIDsExternal;
  SessionTypeIDs: number;
  StartDateTime: string;
  EndDateTime: string;
}

export interface IGetResourcesParamsInternal {
  LocationIDs: core.CLocationIDs;
  SessionTypeIDs: number;
  StartDateTime: Date;
  EndDateTime: Date;
  toString?: () => IGetResourcesParamsExternal;
}

export interface IGetSitesParamsExternal {
  [key: string]: any;
  SearchText?: string;
  RelatedSiteID?: string;
}

export interface IGetSitesParamsInternal {
  SearchText?: string;
  RelatedSiteID?: string;
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
    public LocationIDs: core.CLocationIDs,
    public SessionTypeIDs: number,
    public StartDateTime: Date,
    public EndDateTime: Date
  ) {}
  public toString(): IGetResourcesParamsExternal {
    return Object.assign(
      {
        EndDateTime: this.EndDateTime.toJSON(),
        SessionTypeIDs: this.SessionTypeIDs,
        StartDateTime: this.StartDateTime.toJSON()
      },
      this.LocationIDs.toString()
    );
  }
}

export class CGetSitesParams implements IGetSitesParamsInternal {
  [key: string]: any;
  constructor(public SearchText: string, public RelatedSiteID: string) {}
  public toString(): IGetSitesParamsExternal {
    const getSitesParams: IGetSitesParamsExternal = {};
    for (const key of Object.keys(this)) {
      if (this[key] != null && this[key]  !== "") {
        getSitesParams[key] = this[key];
      }
    }
    return getSitesParams; // {
    // RelatedSiteID: this.RelatedSiteID,
    // SearchText: this.SearchText
    // };
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
  Request: Object.assign(
    defaultGetSitesParamsExternal,
    defaults.defaultPagingParams, // mandatory
    defaults.defaultPageDetail, // mandatory
    defaults.defaultSourceCredentials.toString() // mandatory
  )
};
