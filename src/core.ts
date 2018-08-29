// tslint:disable max-classes-per-file callable-types interface-over-type-literal
import * as appointment from "./appointment";
import * as site from "./site";

export const Site = "Site";
export type TSite = typeof Site;

export const Appointment = "Appointment";
export type TAppointment = typeof Appointment;

export const Staff = "Staff";
export type TStaff = typeof Staff;

export type TPageDetail = "Full" | "Basic" | "Bare";
export type TXMLDetail = { XMLDetail: TPageDetail };
export type TPagingParams = { CurrentPageIndex: number; PageSize: number };
export type TServices = TSite | TAppointment | TStaff;
export type TStaffIDsInternal = number;
export type TStaffIDsExternal = { long: TStaffIDsInternal }; // TODO this needs to be changed so we can input more than one staffid
export type TLocationIDsInternal = number; // TODO this needs to be changed so we can input more than one locID
export type TLocationIDsExternal = { int: TLocationIDsInternal };

export interface ILocationIDsExternal {
  LocationIDs: TLocationIDsExternal;
}

export interface ILocationIDsInternal {
  LocationIDs: TLocationIDsInternal;
  toString: () => ILocationIDsExternal;
}

export class CLocationIDs {
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
interface IPagingParams {
  pagesize: number;
  currentpageindex: number;
}

export class CSessionTypeIDs {
  constructor(typeIDs: number[]) {
    return {
      SessionTypeIDs: typeIDs
    };
  }
}
export class CUserCredentials implements IUserCredentialsInternal {
  constructor(
    public username: string,
    public password: string,
    public siteids: number
  ) {}
  public toString(): IUserCredentialsExternal {
    return {
      UserCredentials: {
        Password: this.password,
        SiteIDs: { int: this.siteids },
        Username: this.username
      }
    };
  }
}

export class CStaffCredentials implements IStaffCredentialsInternal {
  constructor(
    public username: string,
    public password: string,
    public siteids: number
  ) {}
  public toString(): IStaffCredentialsExternal {
    return {
      StaffCredentials: {
        Password: this.password,
        SiteIDs: { int: this.siteids },
        Username: this.username
      }
    };
  }
}

export class CSourceCredentials implements ISourceCredentialsInternal {
  constructor(
    public sourcename: string,
    public password: string,
    public siteIDs: number
  ) {}
  public toString(): ISourceCredentialsExternal {
    return {
      SourceCredentials: {
        Password: this.password,
        SiteIDs: { int: this.siteIDs },
        SourceName: this.sourcename
      }
    };
  }
}

export interface IStaffIDsExternal {
  StaffIDs: TStaffIDsExternal;
}

export interface IStaffIDsInternal {
  StaffIDs: number;
  toString: () => IStaffIDsExternal;
}

export class CStaffIDs implements IStaffIDsInternal {
  constructor(public StaffIDs: number) {}
  public toString(): IStaffIDsExternal {
    return { StaffIDs: { long: this.StaffIDs } };
  }
}
