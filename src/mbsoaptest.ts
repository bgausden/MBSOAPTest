import soap = require("soap");
let Promise = require("bluebird");

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
const defaultLocation = 0;
const defaultSiteID = -99;
const defaultUserPassword = "apitest1234";
const defaultUsername = "Siteowner";

const siteWSDLURL =
  "https://api.mindbodyonline.com/0_5_1/SiteService.asmx?wsdl";
const appointmentWSDLURL =
  "https://api.mindbodyonline.com/0_5_1/AppointmentService.asmx?wsdl";

const defaultUserCreds = {
  locationid: defaultLocation,
  password: defaultUserPassword,
  siteids: [defaultSiteID],
  username: defaultUsername
};

const defaultPagingparams = {
  currentpageindex: 0,
  pagesize: 10
};

const defaultDetail: TPageDetail = "Full";

interface IUserCredentials {
  username: string;
  password: string;
  siteids: number[];
  locationid: number;
}

interface IMBSOAPUserCredentials {
  username: string;
  password: string;
  siteids: number[];
  locationid: number;
}

interface ISourceCredentials {
  sourcename: string;
  password: string;
  siteids: {
    int: number;
  };
  usercredentials: IUserCredentials;
}

class CSessionTypeIDs {
  constructor(typeIDs: number[]) {
    return {
      SessionTypeIDs: typeIDs
    };
  }
}

interface IGetResourcesParams {
  locationid: number;
  sessiontypeids: CSessionTypeIDs;
  startdatetime: Date | string;
  enddatetime: Date | string;
  stringy?: () => IGetResourcesParams;
}

const defaultGetResourceParams: IGetResourcesParams = {
  enddatetime: midnight,
  locationid: 0,
  sessiontypeids: {
    SessionTypeIDs: 1
  },
  startdatetime: midnight
};

interface IPagingParams {
  pagesize: number;
  currentpageindex: number;
}

interface ISOAPGetResourcesArgs {
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
}

interface Resource {
  ID: number;
  Name: string;
}

interface Resources {
  Resource: Resource[];
}

interface GetResourcesResult {
  Status: string;
  ErrorCode: number;
  XMLDetail: string;
  ResultCount: number;
  CurrentPageIndex: number;
  TotalPageCount: number;
  Resources: Resources;
}

interface RootObject {
  GetResourcesResult: GetResourcesResult;
}

class CUserCredentials implements IUserCredentials {
  constructor(
    public username: string,
    public password: string,
    public siteids: number[],
    public locationid: number
  ) {}
}

class CGetResourcesParams implements IGetResourcesParams {
  constructor(
    public locationid: number,
    public sessiontypeids: CSessionTypeIDs,
    public startdatetime: Date,
    public enddatetime: Date
  ) {}

  public stringy(): IGetResourcesParams {
    return {
      enddatetime: this.enddatetime.toJSON(),
      locationid: this.locationid,
      sessiontypeids: this.sessiontypeids,
      startdatetime: this.startdatetime.toJSON()
    };
  }
}

interface ISoapMethodCallback {
  (err: any, result: any, raw: any, soapHeader: any): void;
}

const getResourcesParams: IGetResourcesParams = new CGetResourcesParams(
  0,
  1,
  midnight,
  midnight
).stringy();

const pagingParams: IPagingParams = defaultPagingparams;
const getResourcesArgs: object = {
  Request: Object.assign(getResourcesParams, pagingParams)
};

const options: soap.IOptions = {
  disableCache: false,
  wsdl_headers: {
    "API-key": MBAPIKey,
    SiteId: defaultSiteID
  }
};

function createSoapClientAsync(wsdlURL: string): Promise<soap.Client> {
  return new Promise((resolve: any, reject: any) => {
    soap.createClient(
      wsdlURL,
      (err: any, client: soap.Client): void => {
        client.addHttpHeader("API-key", MBAPIKey);
        client.addHttpHeader("SiteId", defaultSiteID);
        if (err) reject(new Error(err));
        else resolve(client);
      }
    );
  });
}

let siteClientPromise: Promise<soap.Client> = createSoapClientAsync(
  siteWSDLURL
);
let appointmentClientPromise: Promise<soap.Client> = createSoapClientAsync(
  appointmentWSDLURL
);

let getScheduleItemsResult: object = {};

appointmentClientPromise.then(client => {
  let getScheduleItems = client.GetScheduleItems as soap.ISoapMethod;
  getScheduleItems(undefined, (_err, result, _raw, _soapHeader) => {
    console.log(`${JSON.stringify(client.describe(), undefined, 2)}`);
  });
  //console.log(`result: ${JSON.stringify(client.describe(), undefined, 2)}`);
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

console.log("Done async");


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
