import { TLocationIDsInternal } from "src/types/core";

import { CLocationIDs } from "./core";

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
