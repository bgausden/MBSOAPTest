// tslint:disable max-classes-per-file callable-types interface-over-type-literal
import * as appointment from "./appointment";
import * as site from "./site";

export type TPageDetail = "Full" | "Basic" | "Bare";
export type TXMLDetail = { XMLDetail: TPageDetail };
export type TPagingParams = { CurrentPageIndex: number, PageSize: number};
export type TMBServices = "Site" | "Appointment";

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
    toString?: () => IUserCredentialsExternal;
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
    toString?: () => IStaffCredentialsExternal;
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
    toString?: () => ISourceCredentialsExternal;
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
