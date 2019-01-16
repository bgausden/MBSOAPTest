import {
  IGetResourcesParamsExternal,
  IGetSitesParamsExternal
} from "src/interfaces/site";

import { CGetResourcesParams, CGetSitesParams } from "../classes/site";

import {
  defaultLocationIDs,
  defaultPageDetail,
  defaultPagingParams,
  defaultRelatedSiteID,
  defaultSearchText,
  defaultSessionTypeIDs,
  midnight
} from "./core";

import { ISoapRequest } from "src/interfaces/core";

export const GetSites = "GetSites";

export const GetLocations = "GetLocations";

export const GetActivationCode = "GetActivationCode";
export type GetActivationCode = typeof GetActivationCode;

export const GetPrograms = "GetPrograms";

export const GetSessionTypes = "GetSessionTypes";

export const GetResources = "GetResources";

export const GetRelationships = "GetRelationships";

export const GetGenders = "GetGenders";

export const GetProspectStages = "GetProspectStages";

export const GetMobileProviders = "GetMobileProviders";

export const defaultGetResourcesParams: IGetResourcesParamsExternal = new CGetResourcesParams(
  defaultLocationIDs,
  defaultSessionTypeIDs,
  midnight,
  midnight
).toString();

export const defaultGetResourcesRequest: ISoapRequest = {
  Request: Object.assign(defaultGetResourcesParams, defaultPagingParams)
};

export const defaultGetSitesParamsExternal: IGetSitesParamsExternal = new CGetSitesParams(
  defaultSearchText,
  defaultRelatedSiteID
).toString();

export const defaultGetSitesRequest: ISoapRequest = {
  Request: Object.assign(
    defaultGetSitesParamsExternal,
    defaultPagingParams, // mandatory
    defaultPageDetail // mandatory
  )
};
