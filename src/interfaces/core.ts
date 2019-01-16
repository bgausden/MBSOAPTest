import BluebirdPromise from "bluebird";
import { Client } from "soap";
import {
  TLocationIDsInternal,
  TPageDetail,
  TServiceMethod,
  TServiceMethodParamsExternal,
  TServices,
  TStaffIDsInternal
} from "../types/core";

export interface IXMLDetail {
  XMLDetail: TPageDetail;
}
export interface IPagingParams {
  CurrentPageIndex: number;
  PageSize: number;
}

export interface ILocationIDsExternal {
  LocationIDs: { int: TLocationIDsInternal };
}
export interface IStaffIDsExternal {
  long: TStaffIDsInternal;
} // TODO this needs to be changed so we can input more than one staffid

interface ILocationIDsInternal {
  LocationIDs: TLocationIDsInternal;
  toString: () => ILocationIDsExternal;
}

export class CLocationIDs implements ILocationIDsInternal {
  constructor(public LocationIDs: TLocationIDsInternal) {}
  public toString(): ILocationIDsExternal {
    return {
      LocationIDs: { int: this.LocationIDs }
    };
  }
}

export interface IUserCredentialsExternal {
  UserCredentials: {
    Username: string;
    Password: string;
    SiteIDs: { int: number };
  };
}

export interface IUserCredentialsInternal {
  username: string;
  password: string;
  siteids: number;
  toString: () => IUserCredentialsExternal;
}

export interface IStaffCredentialsExternal {
  StaffCredentials: {
    Username: string;
    Password: string;
    SiteIDs: { int: number };
  };
}

export interface IStaffCredentialsInternal {
  username: string;
  password: string;
  siteids: number;
  toString: () => IStaffCredentialsExternal;
}

export interface ISourceCredentialsExternal {
  SourceCredentials: {
    SourceName: string;
    Password: string;
    SiteIDs: { int: number };
  };
}

export interface ISourceCredentialsInternal {
  sourcename: string;
  password: string;
  siteIDs: number;
  toString: () => ISourceCredentialsExternal;
}

export interface IStaffIDsInternal {
  StaffIDs: number;
  toString: () => IStaffIDsExternal;
}

// Parameter object for making a SOAP request
export interface IRequestParms {
  service: TServices;
  serviceMethod: TServiceMethod;
  request: ISoapRequest | undefined;
  soapClientPromise?: BluebirdPromise<Client>;
  error?: string;
}

/* export interface IStaffIDsExternal {
    StaffIDs: {long: TStaffIDsInternal}
}
 */

// ISoapRequest is an object with a single member "Request". The value is an object containing the request parameters. We pass this to the SOAP library
export interface ISoapRequest {
  Request: TServiceMethodParamsExternal;
}
