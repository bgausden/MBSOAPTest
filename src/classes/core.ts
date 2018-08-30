import {
  ISourceCredentialsExternal,
  ISourceCredentialsInternal,
  IStaffCredentialsExternal,
  IStaffCredentialsInternal,
  IUserCredentialsExternal,
  IUserCredentialsInternal
} from "../interfaces/core";
import { TStaffIDsExternal, TStaffIDsInternal } from "../types/core";

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


export class CStaffIDs {
  constructor(public StaffIDs: TStaffIDsInternal) {}
  public toString(): TStaffIDsExternal {
    return {StaffIDs: {long: this.StaffIDs }};
  }
}
