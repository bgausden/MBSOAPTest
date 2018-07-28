/* tslint:disable */
/* tslint:disable: no-console variable-name max-line-length*/
import soap = require("soap");

type TPageDetail = "Full"|"Basic"|"Bare";
type MBSiteCall = "GetSites"|"GetLocations"|"GetActivationCode"|"GetPrograms"|"GetSessionTypes"|"GetResources"|"GetRelationships"|"GetGenders"|"GetProspectStages"|"GetMobileProviders";

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

// source credentials deprecated in MB API >= v5.0
/* const defaultSourceCreds = {
  password: "oHmyTX0H/pciVoPW35pwahivDsE=",
  siteids: defaultSiteIDs,
  sourcename: "LissomeHongKongLimited",
  usercredentials: defaultUserCreds,
}; */

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
  siteids: { int: number };
  usercredentials: IUserCredentials;
}

class CSessionTypeIDs {
  constructor(typeIDs: number[]) {
    return ({SessionTypeIDs: typeIDs})
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
  sessiontypeids: {SessionTypeIDs: 1},
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
  ) { };
}

/*   public createMBSOAPUserCredentials(): IMBSOAPUserCredentials {
    return {
      locationid: this.locationid,
      password: this.password,
      siteids: this.siteids,
      username: this.username,
    }
  } */


// tslint:disable-next-line:max-classes-per-file
// Source Credentials deprecated in API v5.0 and up
/* class CSourceCredentials implements ISourceCredentials {
  constructor(
    public sourcename: string, 
    public password: string, 
    public siteids: { int: number },
    public usercredentials: IUserCredentials, 
    public LocationID: number,
    public SessionTypeIDs: number, 
    public StartDateTime: string, 
    public EndDateTime: string) { }
} */

// tslint:disable-next-line:max-classes-per-file
class CGetResourcesParams implements IGetResourcesParams {
  constructor(
    public locationid: number,
    public sessiontypeids: CSessionTypeIDs, 
    public startdatetime: Date,
    public enddatetime: Date) { };

  public stringy(): IGetResourcesParams {
    return ({
      enddatetime: this.enddatetime.toJSON(),
      locationid: this.locationid,
      sessiontypeids: this.sessiontypeids,
      startdatetime: this.startdatetime.toJSON(),
    });
  }
}

const testGRParams = new CGetResourcesParams(0, 1, midnight, midnight);

// tslint:disable-next-line:max-classes-per-file
/* class CGetResourcesArgs {
  constructor(public userCredentials: IUserCredentials, public sourceCredentials: ISourceCredentials,
              _getResourcesParam: IGetResourcesParams, _pagingParam: IPagingParams, _detail: TPageDetail) { }
}
 */

/* 
source credentials are deprecated in MB API >= v5.0
const sourceCreds: ISourceCredentials = defaultSourceCreds;
 */

// tslint:disable-next-line:max-line-length
const getResourcesParams: IGetResourcesParams = (new CGetResourcesParams(0, 1, midnight, midnight)).stringy();
// const getResourcesParams: IGetResourcesParams = defaultGetResourceParams;
const pagingParams: IPagingParams = defaultPagingparams;
const getResourcesArgs: object = {Request: Object.assign(getResourcesParams, pagingParams)};
// const myCallback = (err: any, client: soap.Client): void => {console.log(err)};

// const myCallback = (_err: any, client: soap.Client) => {client.GetResources(getResourcesArgs, (_err, _result, _rawResponse, _soapHeader, _rawRequest) => void)};
// soap.createClient(wsdlUrl, options, myCallback);

const options: soap.IOptions = {
  disableCache: false,
  wsdl_headers: {
    "API-key" : MBAPIKey,
    SiteId: defaultSiteID,
    }
  };

// soap.createClient(wsdlUrl, (_err, client): void => {const GetResources = client.GetResource as ((getResourcesArgs: object, callback: (err: any, result: any, raw: any, soapHeader: any) => void) => void);
// tslint:disable-next-line:align no-shadowed-variable
// GetResources(getResourcesArgs, (_err, _result, _raw, _soapHeader): void => { console.log(client.lastRequest); });

// type ISOAPGetResourcesMethod = ((getResourcesArgs: object, callback: (err: any, result: any, raw: any, soapHeader: any) => void) => void);

soap.createClient(wsdlUrl, (_err: any, client: soap.Client): void => {
  client.addHttpHeader("API-key",MBAPIKey) ;
  client.addHttpHeader("SiteId", defaultSiteID);
  const GetResources = client.GetResources as soap.ISoapMethod;
  GetResources(getResourcesArgs, (_err, _result, _raw, _soapHeader): void => {const siteDescription = client.describe();
  console.log(`_result: ${JSON.stringify(_result,undefined,2)}`)})
});

// @ts-ignore TS2349
// client.GetResources(getResourcesArgs, (_err, _result, _raw, _soapHeader): void => { console.log(client.lastRequest) }) as ISOAPMethod;

  // tslint:disable-next-line:no-shadowed-variable
  // client.GetResources(getResourcesArgs, (_err, _result, _raw, _soapHeader): void => { console.log(client.lastRequest) }) as ((getResourcesArgs: object, callback: (err: any, result: any, raw: any, soapHeader: any) => void) => void);

// soap.createClient(wsdlUrl, (_err, client): void => {
  // const GetResources = client.GetResources as ((getResourcesArgs: object, callback: (err: any, result: any, raw: any, soapHeader: any) => void) => void);
  // tslint:disable-next-line:no-shadowed-variable
  // GetResources(getResourcesArgs, (_err, _result, _raw, _soapHeader): void => { console.log(client.lastRequest); });

// const GetResources = client["GetResources"] as ((getResourcesArgs: object, callback: (err: any, result: any, raw: any, soapHeader: any) => void) => void);
  // tslint:disable-next-line:no-shadowed-variable
  // GetResources(getResourcesArgs, (_err, _result, raw, _soapHeader): void => { console.log(client.lastRequest); });

  // console.log(JSON.stringify(client.describe(),null,4));
  // console.log(Object.keys(client));
  // console.log(Object.getOwnPropertyDescriptor(client,MBSiteCall.GetResources));

  // client[MBSiteCall.GetResources](args,(err: any, result: any, raw: any, soapHeader: any) );
  // client[MBSiteCall.GetResources](args,(err :any, result :any, raw :any, soapHeader:any ) :void => {console.log(result)})

// });

/* function isValidDate<T>(date: T) {
  return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(<any>date);
} */
console.log("Done");
console.log();