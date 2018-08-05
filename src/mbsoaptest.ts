// tslint:disable max-classes-per-file callable-types interface-over-type-literal
import Promise from "bluebird";
import soap = require("soap");
import {format} from "xml-formatter";

type TPageDetail = "Full" | "Basic" | "Bare";
type MBSiteCall =
  | "GetSites"
  | "GetLocations"
  | "GetActivationCode"
  | "GetPrograms"
  | "GetSessionTypes"
  | "GetResources"
  | "GetRelationships"
  | "GetGenders"
  | "GetProspectStages"
  | "GetMobileProviders";

const MBAPIKey = "74b68c31704e40a69e9e60e1ef1de765";
const midnight = new Date(new Date().setHours(0, 0, 0, 0));
const defaultStartDate = new Date(Date.now());
const defaultEndDate = new Date(Date.now());
const defaultLocationIDs = 0;
const defaultSiteIDs = -99;
const defaultUserPassword = "apitest1234";
const defaultUsername = "Siteowner";
const defaultIgnorePrepFinishTimes = false;
const defaultStaffIDs = 0;
const defaultSessionTypeIDs = 1;
const defaultSourceName = "LissomeHongKongLimited";
const defaultSourcePassword = "oHmyTX0H/pciVoPW35pwahivDsE=";

const siteWSDLURL =
  "https://api.mindbodyonline.com/0_5_1/SiteService.asmx?wsdl";
const appointmentWSDLURL =
  "https://api.mindbodyonline.com/0_5_1/AppointmentService.asmx?wsdl";

const defaultPagingParams = {
  currentpageindex: 0,
  pagesize: 10,
};

type TXMLDetail = {XMLDetail: TPageDetail };

const defaultPageDetail: TXMLDetail = {XMLDetail: "Bare"};

interface IUserCredentialsExternal {
  UserCredentials: {
    Username: string;
    Password: string;
    SiteIDs: { int: number }
  };
}

interface IUserCredentialsInternal {
  username: string;
  password: string;
  siteids: number;
  toString?: () => IUserCredentialsExternal;
}

interface ISourceCredentialsExternal {
  SourceCredentials: {
    SourceName: string;
    Password: string;
    SiteIDs: { int: number }
  };
}

interface ISourceCredentialsInternal {
  sourcename: string;
  password: string;
  siteIDs: number;
  toString?: () => ISourceCredentialsExternal;
}

class CSessionTypeIDs {
  constructor(typeIDs: number[]) {
    return {
      SessionTypeIDs: typeIDs,
    };
  }
}

interface IGetResourcesParamsExternal {
  LocationIDs: number;
  SessionTypeIDs: number;
  StartDateTime: string;
  EndDateTime: string;
}

interface IGetResourcesParamsInternal {
  locationid: number;
  sessiontypeids: number;
  startdatetime: Date;
  enddatetime: Date;
  toString?: () => IGetResourcesParamsExternal;
}

interface IGetAppointmentsParamsInternal {
  locationIDs: number;
  staffIDs: number;
  startDateTime: Date;
  endDateTime: Date;
  ignorePrepFinishTimes: boolean;
}

interface IGetScheduleItemsParamsExternal {
  LocationIDs: { int: number };
  StaffIDs: { long: number };
  StartDate: string;
  EndDate: string;
  IgnorePrepFinishTimes: boolean;
}

interface IPagingParams {
  pagesize: number;
  currentpageindex: number;
}

// Deprecated in favour of API Key in HTTP headers
/* interface ISOAPGetResourcesArgs {
  Request: {
    SourceCredentials: ISourceCredentials;
    UserCredentials: IUserCredentials;
    LocationID: number;
    SessionTypeIDs: CSessionTypeIDs;
    StartDateTime: string;
    EndDateTime: string;
    XMLDetail: string;
    PageSize: number;
    CurrentPageIndex: number;
  };
} */

interface IResource {
  ID: number;
  Name: string;
}

interface IResources {
  Resource: IResource[];
}

interface IGetResourcesResult {
  Status: string;
  ErrorCode: number;
  XMLDetail: string;
  ResultCount: number;
  CurrentPageIndex: number;
  TotalPageCount: number;
  Resources: IResources;
}

interface IRootObject {
  GetResourcesResult: IGetResourcesResult;
}

class CUserCredentials implements IUserCredentialsInternal {
  constructor(
    public username: string,
    public password: string,
    public siteids: number
  ) { }
  public toString(): IUserCredentialsExternal {
    return {
      UserCredentials: {
        Password: this.password,
        SiteIDs: { int: this.siteids },
        Username: this.username,
      },
    };
  }
}

class CSourceCredentials implements ISourceCredentialsInternal {
  constructor(
    public sourcename: string,
    public password: string,
    public siteIDs: number
  ) { }
  public toString(): ISourceCredentialsExternal {
    return {
      SourceCredentials: {
        Password: this.password,
        SiteIDs: { int: this.siteIDs },
        SourceName: this.sourcename,
      },
    };
  }
}

const defaultUserCredentials = new CUserCredentials(
  defaultUsername,
  defaultUserPassword,
  defaultSiteIDs
).toString();

const defaultSourceCredentials: ISourceCredentialsExternal = new CSourceCredentials(
  defaultSourceName,
  defaultSourcePassword,
  defaultSiteIDs
).toString();

class CGetResourcesParams implements IGetResourcesParamsInternal {
  constructor(
    public locationid: number,
    public sessiontypeids: number,
    public startdatetime: Date,
    public enddatetime: Date
  ) {}

  public toString(): IGetResourcesParamsExternal {
    return {
      EndDateTime: this.enddatetime.toJSON(),
      LocationIDs: this.locationid,
      SessionTypeIDs: this.sessiontypeids,
      StartDateTime: this.startdatetime.toJSON(),
    };
  }
}

const defaultGetResourceParams: IGetResourcesParamsExternal = new CGetResourcesParams (
  defaultLocationIDs,
  defaultSessionTypeIDs,
  midnight,
  midnight
).toString();

class CGetScheduleItemsParams implements IGetAppointmentsParamsInternal {
  constructor(
    public locationIDs: number,
    public staffIDs: number,
    public startDateTime: Date,
    public endDateTime: Date,
    public ignorePrepFinishTimes: boolean
  ) {}
  public toString(): IGetScheduleItemsParamsExternal {
    return {
      EndDate: this.endDateTime.toJSON(),
      IgnorePrepFinishTimes: this.ignorePrepFinishTimes,
      LocationIDs: { int: this.locationIDs },
      StaffIDs: { long: this.staffIDs },
      StartDate: this.startDateTime.toJSON(),
    };
  }
}

const defaultGetResourcesParams: IGetResourcesParamsExternal = new CGetResourcesParams(
  defaultLocationIDs,
  defaultSessionTypeIDs,
  midnight,
  midnight).toString();

const defaultGetScheduleItemsParams: IGetScheduleItemsParamsExternal = new CGetScheduleItemsParams(
  defaultLocationIDs,
  defaultStaffIDs,
  defaultStartDate,
  defaultEndDate,
  defaultIgnorePrepFinishTimes
).toString();

const getResourcesArgs: object = {
  Request: Object.assign(defaultGetResourcesParams, defaultPagingParams),
};

// required appt args appear to be SourceCredential + UserCredentials + PagingDetails + DetailLevel
// + StaffIDs + LocationID + (optional) StartDate + (optional) EndDate
// note this is *not* consistent with the MB documentation but empirically, this is what works
const getScheduleItemsArgs: IGetScheduleItemsParamsExternal =  Object.assign(
  defaultSourceCredentials,
  defaultUserCredentials,
  defaultGetScheduleItemsParams,
  defaultPagingParams,
  defaultPageDetail
);

const options: soap.IOptions = {
  disableCache: false,
  // This doesn't appear to work but client.addHttpHeader() *does*
  /* wsdl_headers: {
    "API-key": MBAPIKey,
    SiteId: defaultSiteID
  } */
};

type TSoapRequest = {
  Request: IGetResourcesParamsExternal|IGetScheduleItemsParamsExternal
};

function request(params: IGetResourcesParamsExternal|IGetScheduleItemsParamsExternal): TSoapRequest {
  // return an Object with one property "Request" whose value is the param Object
  return {Request: params};
}

function createSoapClientAsync(wsdlURL: string): Promise<soap.Client> {
  return new Promise((resolve: any, reject: any) => {
    soap.createClient(
      wsdlURL,
      (err: any, client: soap.Client): void => {
        client.addHttpHeader("API-key", MBAPIKey);
        client.addHttpHeader("SiteId", defaultSiteIDs);
        if (err) {
          reject(new Error(err));
        } else {
          resolve(client);
        }
      }
    );
  });
}

const siteClientPromise: Promise<soap.Client> = createSoapClientAsync(
  siteWSDLURL
);
const appointmentClientPromise: Promise<soap.Client> = createSoapClientAsync(
  appointmentWSDLURL
);

interface ISoapMethodCallback { (err: any, result: object, raw: any, soapHeader: any): void; }

const getScheduleItemsCallback: ISoapMethodCallback = (err, result, raw, soapHeader) => {
  console.log(`err: \n\n${JSON.stringify(err, undefined, 2)}`);
  console.log(`result: \n\n${JSON.stringify(result, undefined, 2)}`);
  // you cannot access client in this context
  // console.log(`lastRequest: \n\n${client.lastRequest}\n`);
};

appointmentClientPromise.then((client) => {
  const getScheduleItems = client.GetScheduleItems as soap.ISoapMethod;
  getScheduleItems(request(getScheduleItemsArgs), getScheduleItemsCallback);
  appointmentClientPromise.catch((reason: any) => {
    throw new Error(reason as string);
  });
});

/* siteClientPromise.then(client => {
  let getResources = client.GetResources as soap.ISoapMethod;
  getResources(getResourcesArgs, (_err, result, _raw, _soapHeader) => {
    console.log(
      `result: ${JSON.stringify(
        result.GetResourcesResult.ResultCount,
        undefined,
        2
      )}`
    );
  });
});
siteClientPromise.catch((reason: any) => {
  throw new Error(reason as string);
});
 */
console.log(`Done async\n`);

/* function getResourcesAsync(): Promise<any> {
  return new Promise((resolve: any, reject: any) => {
    soap.createClient(
      siteWSDLURL
    ,
      (err: any, client: soap.Client): void => {
        client.addHttpHeader("API-key", MBAPIKey);
        client.addHttpHeader("SiteId", defaultSiteID);
        if (err) throw new Error(err as string);
        //@ts-ignore TS2349
        client.GetResources (
          getResourcesArgs,
          //@ts-ignore TS7006
          (err, result, _raw, _soapHeader): void => {
            if (err) reject(new Error(err));
            if (!result) return;
            resolve(result);
          }
        );
      }
    );
  });
} */

/* let p: Promise<any> = getResourcesAsync();
p.then((result: RootObject) => {
  console.log(
    `result: ${JSON.stringify(
      result.GetResourcesResult.ResultCount,
      undefined,
      2
    )}`
  );
});
p.catch((reason: any) => {
  throw new Error(reason as string);
});

console.log("Done async");
 */
// Working synchronous implementation
/* soap.createClient(siteWSDLURL
, (_err: unknown, client: soap.Client): void => {
  client.addHttpHeader("API-key", MBAPIKey);
  client.addHttpHeader("SiteId", defaultSiteID);
  const GetResources = client.GetResources as soap.ISoapMethod;
  GetResources(getResourcesArgs, (_err, _result, _raw, _soapHeader): void => {
    console.log(`_result: ${JSON.stringify(_result,undefined,2)}`)
  }) //Template Literal
}); */
