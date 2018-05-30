// import { isUndefined } from "util";

type TXMLDetail = "Full" | "Basic" | "Bare";
type MBSOAPCall = "GetResources";

type Constructor<T = {}> = new (...args: any[]) => T;

class CSourceCredentialsDetail {
    sourceName: string;
    password: string;
    siteIDs: number[];

    constructor(sourceName: string, password: string, siteIDs: number[]) {
        this.sourceName = sourceName;
        this.password = password;
        this.siteIDs = siteIDs;
    }
}

function addPagingInfo<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        pageSize: number = 100;
        pageIndex: number = 0;
        xmlDetail!: TXMLDetail;
        constructor(...args: any[]) {
            super(...args);
        }

        initPagingInfo(pageSize: number, pageIndex: number, xmlDetail: TXMLDetail) {
            this.pageSize = pageSize;
            this.pageIndex = pageIndex;
            this.xmlDetail = xmlDetail;
        }
    }
}

function addUserCredentials<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        userName!: string;
        password!: string;
        siteIDs!: number[];
        locationID: number = 0;
        constructor(...args: any[]) {
            super(...args);
        }

        initUserCredentials(userName: string, password: string, siteIDs: number[], locationID: number) {
            this.userName = userName;
            this.password = password;
            this.siteIDs = siteIDs;
            this.locationID = locationID;
        }

        objectifyUserCredentials = (): object => {
            return (
                {
                    UserCredentials: {
                        Username: this.userName,
                        Password: this.password,
                        SiteIDs: {
                            int: this.siteIDs[0]
                        }
                    }
                }
            )
        }
    }
}

function addSourceCredentials<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        sourceCredentials!: CSourceCredentialsDetail;
        constructor(...args: any[]) {
            super(...args);
        }

        initSourceCredentials(sourceName: string, password: string, siteIDs: number[]) {
            this.sourceCredentials = new CSourceCredentialsDetail(sourceName, password, siteIDs);
        }

        objectifySourceCredentials = (): object => {
            return ({
                SourceCredentials: {
                    SourceName: this.sourceCredentials.sourceName,
                    Password: this.sourceCredentials.password,
                    SiteIDs: {
                        int: this.sourceCredentials.siteIDs[0],
                    }
                }
            })
        }
    }
}

interface IGetResourcesParam {
    locationID: number;
    sessionTypeIDs: number[];
    startDateTime: Date;
    endDateTime: Date;
}

class CGetResourcesParam implements IGetResourcesParam {
    locationID: number = 0;
    sessionTypeIDs: number[];
    startDateTime: Date = new Date(new Date().setHours(0, 0, 0, 0));
    endDateTime: Date = new Date(new Date().setHours(0, 0, 0, 0));
    constructor(sessionTypeIDs: number[], locationIDs: number, startDateTime: Date,endDateTime: Date) {
        this.sessionTypeIDs = sessionTypeIDs;
        this.locationID = locationIDs;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;  
    }
}

const CGetResourcesRequest = addSourceCredentials(addUserCredentials(addPagingInfo(CGetResourcesParam)));

const inst = (new CGetResourcesRequest([1],0,new Date(new Date().setHours(0, 0, 0, 0)),new Date(new Date().setHours(11, 59, 59, 0))));
inst.initPagingInfo(70, 0, "Full");
inst.initUserCredentials("Siteowner", "apitest1234", [-99], 0);
inst.initSourceCredentials("LissomeHongKongLimited", "oHmyTX0H/pciVoPW35pwahivDsE=", [-99])
console.log(inst.objectifySourceCredentials());
console.log("Done.");

