// tslint:disable max-classes-per-file callable-types interface-over-type-literal

import * as defaults from "./defaults";
import { CLocationIDs } from "./interfaces/core";
import { ILocationIDsExternal } from "./interfaces/core";
import * as mbsoap from "./mbsoap";
import { TLocationIDsInternal } from "./types/core";

export const GetSites = "GetSites";
export type GetSites = typeof GetSites;

export const GetLocations = "GetLocations";
export type GetLocations = typeof GetLocations;

export const GetActivationCode = "GetActivationCode";
export type GetActivationCode = typeof GetActivationCode;

export const GetPrograms = "GetPrograms";
export type GetPrograms = typeof GetPrograms;

export const GetSessionTypes = "GetSessionTypes";
export type GetSessionTypes = typeof GetSessionTypes;

export const GetResources = "GetResources";
export type GetResources = typeof GetResources;

export const GetRelationships = "GetRelationships";
export type GetRelationships = typeof GetRelationships;

export const GetGenders = "GetGenders";
export type GetGenders = typeof GetGenders;

export const GetProspectStages = "GetProspectStages";
export type GetProspectStages = typeof GetProspectStages;

export const GetMobileProviders = "GetMobileProviders";
export type GetMobileProviders = typeof GetMobileProviders;

export type TSiteMethod =
  | GetSites
  | GetLocations
  | GetActivationCode
  | GetPrograms
  | GetSessionTypes
  | GetResources
  | GetRelationships
  | GetGenders
  | GetProspectStages
  | GetMobileProviders;

export interface IResource {
  ID: number;
  Name: string;
}

export interface IResources {
  Resource: IResource[];
}

export interface ILocation {
  SiteID: number;
  BusinessDescription: string;
  AdditionalImageURLs?: any;
  HasClasses: boolean;
  ID: number;
  Name: string;
  Tax1: string;
  Tax2: string;
  Tax3: string;
  Tax4: string;
  Tax5: string;
}

export interface IProgram {
  ID: number;
  Name: string;
  ScheduleType: string;
}

export interface ISessionType {
  NumDeducted: number;
  ID: number;
  Name: string;
}

export interface IGetResourcesParamsExternal {
  LocationIDs: {int: TLocationIDsInternal};
  SessionTypeIDs: number;
  StartDateTime: string;
  EndDateTime: string;
}

export interface IGetResourcesParamsInternal {
  LocationIDs: CLocationIDs;
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
    public LocationIDs: CLocationIDs,
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
      if (this[key] != null && this[key] !== "") {
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
