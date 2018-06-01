/* tslint:disable: no-console variable-name max-line-length*/
import soap = require("soap");

type TPageDetail = "Full"|"Basic"|"Bare";

enum MBSiteCall {
  GetSites,
  GetLocations,
  GetActivationCode,
  GetPrograms,
  GetSessionTypes,
  GetResources,
  GetRelationships,
  GetGenders,
  GetProspectStages,
  GetMobileProviders,
}

const wsdlUrl = "https://api.mindbodyonline.com/0_5_1/SiteService.asmx?wsdl";

const defaultUserCreds = {
  locationid: 0,
  password: "apitest1234",
  siteids: {int: -99},
  username: "Siteowner",
  // siteids: { 'int': -99 }, this is what the soap library expects
};

const defaultSourceCreds = {
  password: "oHmyTX0H/pciVoPW35pwahivDsE=",
  siteids: { int: -99 }, sourcename: "LissomeHongKongLimited",
  usercredentials: defaultUserCreds,
};

const defaultGetResourceParams: IGetResourcesParams = {
  enddatetime: new Date(new Date().setHours(0, 0, 0, 0)),
  locationid: 0,
  sessiontypeid: 1,
  startdatetime: new Date(new Date().setHours(0, 0, 0, 0)),
};

const defaultPagingparams = {
  currentpageindex: 0,
  pagesize: 10,
};

const defaultDetail: TPageDetail = "Full";

interface IUserCredentials {
  username: string;
  password: string;
  siteids: {int: number};
  locationid: number;
}

interface IMBSOAPUserCredentials {
  username: string;
  password: string;
  siteids: { int: number };
  locationid: number;
}

interface ISourceCredentials {
  sourcename: string;
  password: string;
  siteids: { int: number };
  usercredentials: IUserCredentials;
}

interface IGetResourcesParams {
  locationid: number;
  sessiontypeid: number;
  startdatetime: Date | string;
  enddatetime: Date | string;
  stringy?: () => IGetResourcesParams;
}

interface IPagingParams {
  pagesize: number;
  currentpageindex: number;
}

interface ISOAPGetResourcesArgs {
  Request: {
    SourceCredentials: ISourceCredentials,
    UserCredentials: IUserCredentials,
    LocationID: number,
    SessionTypeIDs: number,
    StartDateTime: string,
    EndDateTime: string,
    XMLDetail: string,
    PageSize: number,
    CurrentPageIndex: number,
  };
}

class CUserCredentials implements IUserCredentials {
  constructor(public username: string, public password: string,
              public siteids: {"int": number}, public locationid: number) { }
  public createMBSOAPUserCredentials(): IMBSOAPUserCredentials {
    return {
      locationid: this.locationid,

      password: this.password,
      siteids: this.siteids,
      username: this.username,

    };
  }
}

// tslint:disable-next-line:max-classes-per-file
class CSourceCredentials implements ISourceCredentials {
  constructor(public sourcename: string, public password: string, public siteids: { int: number },
              public usercredentials: IUserCredentials, public LocationID: number,
              public SessionTypeIDs: number, public StartDateTime: string, public EndDateTime: string) { }
}

// tslint:disable-next-line:max-classes-per-file
class CGetResourcesParams implements IGetResourcesParams {
  constructor(public locationid: number, public sessiontypeid: number, public startdatetime: Date,
              public enddatetime: Date) { }
  public stringy(): IGetResourcesParams {
    return {
      enddatetime: this.enddatetime.toJSON(),
      locationid: this.locationid,
      sessiontypeid: this.sessiontypeid,
      startdatetime: this.startdatetime.toJSON(),
    };
  }
}

const testGRParams = new CGetResourcesParams(0, 1, new Date(new Date().setHours(0, 0, 0, 0)), new Date(new Date().setHours(0, 0, 0, 0)));

// tslint:disable-next-line:max-classes-per-file
class CGetResourcesArgs {
  constructor(public userCredentials: IUserCredentials, public sourceCredentials: ISourceCredentials,
              getResourcesParam: IGetResourcesParams, pagingParam: IPagingParams, detail: TPageDetail) { }
}

const sourceCreds: ISourceCredentials = defaultSourceCreds;

// tslint:disable-next-line:max-line-length
const getResourcesParams: IGetResourcesParams = (new CGetResourcesParams(0, 1, new Date(new Date().setHours(0, 0, 0, 0)), new Date(new Date().setHours(0, 0, 0, 0)))).stringy();
// const getResourcesParams: IGetResourcesParams = defaultGetResourceParams;
const pagingParams: IPagingParams = defaultPagingparams;
const getResourceArgs: object = {
  Request: Object.assign(sourceCreds, getResourcesParams, pagingParams),
};

soap.createClient(wsdlUrl, (_err, client): void => {
  const GetResources = client[MBSiteCall[MBSiteCall.GetResources]] as ((getResourcesArgs: object, callback: (err: any, result: any, raw: any, soapHeader: any) => void) => void);
  GetResources(getResourceArgs, (_err, _result, raw, _soapHeader): void => { console.log(client.lastRequest); console.log(raw); });

  // console.log(JSON.stringify(client.describe(),null,4));
  // console.log(Object.keys(client));
  // console.log(Object.getOwnPropertyDescriptor(client,MBSiteCall.GetResources));

  // client[MBSiteCall.GetResources](args,(err: any, result: any, raw: any, soapHeader: any) );
  // client[MBSiteCall.GetResources](args,(err :any, result :any, raw :any, soapHeader:any ) :void => {console.log(result)})

});

/* function isValidDate<T>(date: T) {
  return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(<any>date);
} */
