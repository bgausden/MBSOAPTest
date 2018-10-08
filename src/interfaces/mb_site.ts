export interface ISite {
  ID: number;
  Name: string;
  Description: string;
  LogoURL: string;
  PageColor1: string;
  PageColor2: string;
  PageColor3: string;
  PageColor4: string;
  AcceptsVisa: boolean;
  AcceptsDiscover: boolean;
  AcceptsMasterCard: boolean;
  AcceptsAmericanExpress: boolean;
  ContactEmail: string;
  SMSPackageEnabled: boolean;
  AllowsDashboardAccess: boolean;
  PricingLevel: string;
}

export interface ISites {
  Site: ISite[];
}

export interface IGetSitesResult {
  Status: string;
  ErrorCode: number;
  XMLDetail: string;
  ResultCount: number;
  CurrentPageIndex: number;
  TotalPageCount: number;
  Sites: ISites;
}

export interface IGetSitesResponse {
  GetSitesResult: IGetSitesResult;
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

export interface IGetResourcesResponse {
    GetResourcesResult: IGetResourcesResult;
}
