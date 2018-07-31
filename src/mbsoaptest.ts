/* tslint:disable: no-console max-line-length max-classes-per-file */
import soap = require("soap");
var Promise = require("bluebird");

type TPageDetail = "Full" | "Basic" | "Bare";
type MBSiteCall = "GetSites" | "GetLocations" | "GetActivationCode" | "GetPrograms" | "GetSessionTypes" | "GetResources" | "GetRelationships" | "GetGenders" | "GetProspectStages" | "GetMobileProviders";

const MBAPIKey = "74b68c31704e40a69e9e60e1ef1de765";
const midnight = new Date(new Date().setHours(0, 0, 0, 0));
const defaultLocation = 0;
const defaultSiteID = -99;
const defaultUserPassword = "apitest1234";
const defaultUsername = "Siteowner";

const wsdlUrl = "https://api.mindbodyonline.com/0_5_1/SiteService.asmx?wsdl";

const defaultUserCreds = {
  locationid: defaultLocation,
  password: defaultUserPassword,
  siteids: [defaultSiteID],
  username: defaultUsername,
};

const defaultPagingparams = {
  currentpageindex: 0,
  pagesize: 10,
}

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
    int: number
  };
  usercredentials: IUserCredentials;
}

class CSessionTypeIDs {
  constructor(typeIDs: number[]) {
    return ({
      SessionTypeIDs: typeIDs
    })
  }
}

interface IGetResourcesParams {
  locationid: number;
  sessiontypeids: CSessionTypeIDs;
  startdatetime: Date | string;
  enddatetime: Date | string;
  stringy ? : () => IGetResourcesParams;
}

const defaultGetResourceParams: IGetResourcesParams = {
  enddatetime: midnight,
  locationid: 0,
  sessiontypeids: {
    SessionTypeIDs: 1
  },
  startdatetime: midnight,
};

interface IPagingParams {
  pagesize: number;
  currentpageindex: number;
}

interface ISOAPGetResourcesArgs {
  Request: {
    SourceCredentials: ISourceCredentials,
    UserCredentials: IUserCredentials,
    LocationID: number,
    SessionTypeIDs: CSessionTypeIDs,
    StartDateTime: string,
    EndDateTime: string,
    XMLDetail: string,
    PageSize: number,
    CurrentPageIndex: number,
  };
}

class CUserCredentials implements IUserCredentials {
  constructor(
    public username: string,
    public password: string,
    public siteids: number[],
    public locationid: number,
  ) {};
}

class CGetResourcesParams implements IGetResourcesParams {
  constructor(
    public locationid: number,
    public sessiontypeids: CSessionTypeIDs,
    public startdatetime: Date,
    public enddatetime: Date) {}

  public stringy(): IGetResourcesParams {
    return ({
      enddatetime: this.enddatetime.toJSON(),
      locationid: this.locationid,
      sessiontypeids: this.sessiontypeids,
      startdatetime: this.startdatetime.toJSON(),
    });
  }
}

const getResourcesParams: IGetResourcesParams = (new CGetResourcesParams(0, 1, midnight, midnight)).stringy();
const pagingParams: IPagingParams = defaultPagingparams;
const getResourcesArgs: object = {
  Request: Object.assign(getResourcesParams, pagingParams)
};

const options: soap.IOptions = {
  disableCache: false,
  wsdl_headers: {
    "API-key": MBAPIKey,
    "SiteId": defaultSiteID,
  },
};

function getResourcesAsync() {
  return new Promise((resolve, reject) => {
    soap.createClient(wsdlUrl, (_err: any, client: soap.Client): void => {
      client.addHttpHeader("API-key", MBAPIKey);
      client.addHttpHeader("SiteId", defaultSiteID);
      if (_err) throw new Error(_err as string);
      //@ts-ignore TS2349
      client.GetResources(getResourcesArgs, (_err, _result, _raw, _soapHeader): void => {
        if (_err) reject(new Error(_err));
        if (!_result) return;
        console.log(`_result: ${JSON.stringify(_result,undefined,2)}`);
        resolve(_result);
      });
    });
  });
}


getResourcesAsync();

console.log("Done async");

// Working synchronous implementation
soap.createClient(wsdlUrl, (_err: unknown, client: soap.Client): void => {
  client.addHttpHeader("API-key", MBAPIKey);
  client.addHttpHeader("SiteId", defaultSiteID);
  const GetResources = client.GetResources as soap.ISoapMethod;
  GetResources(getResourcesArgs, (_err, _result, _raw, _soapHeader): void => {
    console.log(`_result: ${JSON.stringify(_result,undefined,2)}`)
  }) //Template Literal
});


console.log("Done");
console.log();