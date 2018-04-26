import { isUndefined } from "util";

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
        userCredentials!: {
            userName: string,
            password: string,
            siteIDs: number[],
            locationID: number,
        }
        constructor(...args: any[]) {
            super(...args);
        }

        initUserCredentials(userName: string, password: string, siteIDs: number[], locationID: number) {
            this.userCredentials = {
                userName: userName,
                password: password,
                siteIDs: siteIDs,
                locationID: locationID
            }
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
            this.sourceCredentials.sourceName = sourceName;
            this.sourceCredentials.password = password;
            this.sourceCredentials.siteIDs = siteIDs;
        }
    }
}

interface IGetResourcesParam {
    locationID: number;
    sessionTypeIDs: { "int": number };
    startDateTime: Date;
    endDateTime: Date;
}

class CGetResourcesParam implements IGetResourcesParam {
    locationID: number = 0;
    sessionTypeIDs!: { "int": number };
    startDateTime: Date = new Date(new Date().setHours(0, 0, 0, 0));
    endDateTime: Date = new Date(new Date().setHours(0, 0, 0, 0))
    constructor(sessionTypeIDs: { "int": number }, locationIDs?: number, startDateTime?: Date, endDateTime?: Date) {
        if (!isUndefined(sessionTypeIDs)) { this.sessionTypeIDs = sessionTypeIDs; }
        if (!isUndefined(locationIDs)) { this.locationID = locationIDs; }
        if (!isUndefined(startDateTime)) { this.startDateTime = startDateTime; }
        if (!isUndefined(endDateTime)) { this.endDateTime = endDateTime; }
    }
}

const CGetResourcesRequest = addUserCredentials(addPagingInfo(CGetResourcesParam));

const defaultSessionTypeID = { "int": 1 };
const inst = (new CGetResourcesRequest(defaultSessionTypeID));
inst.initPagingInfo(70, 0, "Full");
inst.initUserCredentials("LissomeHongKongLimited", "oHmyTX0H/pciVoPW35pwahivDsE=", [-99], 0);
console.log(inst);