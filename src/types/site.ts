import { GetActivationCode, GetGenders, GetLocations, GetMobileProviders, GetPrograms, GetProspectStages, GetRelationships, GetResources, GetSessionTypes, GetSites } from "src/constants/site";

export  type TSiteID = number; // needs to be consistent with type of ILocation.ID in interfaces/mb_site.ts
export type TLocationIDs = number; // needs to be consistent with type of ILocation.ID in interfaces/mb_site.ts

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

  export type GetSites = typeof GetSites;

  export type GetLocations = typeof GetLocations;

  export type GetPrograms = typeof GetPrograms;

  export type GetSessionTypes = typeof GetSessionTypes;

  export type GetResources = typeof GetResources;

  export type GetRelationships = typeof GetRelationships;

  export type GetGenders = typeof GetGenders;

  export type GetProspectStages = typeof GetProspectStages;

  export type GetMobileProviders = typeof GetMobileProviders;

