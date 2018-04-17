import soap = require('soap');

const enum EDetail {
  Full,
  Basic,
  Bare
}

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
  GetMobileProviders
}

const wsdlUrl = 'https://api.mindbodyonline.com/0_5_1/SiteService.asmx?wsdl';

const defaultUserCreds = {
  username: 'Siteowner',
  password: 'apitest1234',
  //siteids: { 'int': -99 }, this is what the soap library expects
  siteids: {"int":-99},
  locationid: 0
};

const defaultSourceCreds = {
  sourcename: 'LissomeHongKongLimited',
  password: 'oHmyTX0H/pciVoPW35pwahivDsE=',
  siteids: { 'int': -99 },
  usercredentials: defaultUserCreds
};

const defaultGetResourceParams: IGetResourcesParams = {
  locationid: 0,
  sessiontypeid: 1,
  startdatetime: new Date(new Date().setHours(0, 0, 0, 0)),
  enddatetime: new Date(new Date().setHours(0, 0, 0, 0)),
};

const defaultPagingparams = {
  pagesize: 10,
  currentpageindex: 0
};

const defaultDetail = EDetail.Basic;

interface IUserCredentials {
  username: string,
  password: string,
  siteids: {"int":number},
  locationid: number
}

interface IMBSOAPUserCredentials {
  username: string,
  password: string,
  siteids: { "int": number },
  locationid: number
}

interface ISourceCredentials {
  sourcename: string,
  password: string,
  siteids: { "int": number },
  usercredentials: IUserCredentials
}

interface IGetResourcesParams {
  locationid: number,
  sessiontypeid: number,
  startdatetime: Date | string,
  enddatetime: Date | string,
  stringy?: () => IGetResourcesParams
}

interface IPagingParams {
  pagesize: number,
  currentpageindex: number
}

interface ISOAPGetResourcesArgs {
  Request: {
    SourceCredentials: ISourceCredentials,
    UserCredentials: IUserCredentials,
    LocationID:number,
    SessionTypeIDs: number,
    StartDateTime: string,
    EndDateTime: string,
    XMLDetail: string,
    PageSize: number,
    CurrentPageIndex: number,
  }
}

class CUserCredentials implements IUserCredentials {
  constructor(public username: string, public password: string, public siteids: {"int":number}, public locationid: number) { };
  createMBSOAPUserCredentials(): IMBSOAPUserCredentials {
    return {
      username: this.username,
      password: this.password,
      siteids: this.siteids,
      locationid: this.locationid
    }
  }
}

class CSourceCredentials implements ISourceCredentials {
  constructor(public sourcename: string, public password: string, public siteids: { "int": number }, public usercredentials: IUserCredentials, public LocationID: number,
    public SessionTypeIDs: number, public StartDateTime: string, public EndDateTime: string) { }
}

class CGetResourcesParams implements IGetResourcesParams {
  constructor(public locationid: number, public sessiontypeid: number, public startdatetime: Date, public enddatetime: Date) { }
  stringy(): IGetResourcesParams {
    return {
      locationid: this.locationid,
      sessiontypeid: this.sessiontypeid,
      startdatetime: this.startdatetime.toJSON(),
      enddatetime: this.enddatetime.toJSON()
    }
  }
}

const testGRParams = new CGetResourcesParams(0,1,new Date(new Date().setHours(0, 0, 0, 0)),new Date(new Date().setHours(0, 0, 0, 0)));

class CGetResourcesArgs {
  constructor(public userCredentials: IUserCredentials, public sourceCredentials: ISourceCredentials, getresourcesparam: IGetResourcesParams, pagingparam: IPagingParams, detail: EDetail) { }
}

const sourceCreds: ISourceCredentials = defaultSourceCreds;

const getResourcesParams: IGetResourcesParams = (new CGetResourcesParams(0,1,new Date(new Date().setHours(0, 0, 0, 0)),new Date(new Date().setHours(0, 0, 0, 0)))).stringy();
//const getResourcesParams: IGetResourcesParams = defaultGetResourceParams;
const pagingParams: IPagingParams = defaultPagingparams;
const getResourceArgs: object = {
  Request: Object.assign(sourceCreds, getResourcesParams, pagingParams)
}

soap.createClient(wsdlUrl, (err, client): void => {
  let GetResources = <((get_resources_args: object, callback: (err: any, result: any, raw: any, soapHeader: any) => void) => void)>client[MBSiteCall[MBSiteCall.GetResources]];
  GetResources(getResourceArgs, (err, result, raw, soapHeader): void => { console.log(client.lastRequest); console.log(raw) });

  //console.log(JSON.stringify(client.describe(),null,4));
  //console.log(Object.keys(client));
  //console.log(Object.getOwnPropertyDescriptor(client,MBSiteCall.GetResources));

  //client[MBSiteCall.GetResources](args,(err: any, result: any, raw: any, soapHeader: any) );
  //client[MBSiteCall.GetResources](args,(err :any, result :any, raw :any, soapHeader:any ) :void => {console.log(result)})

});


/* function isValidDate<T>(date: T) {
  return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(<any>date);
} */
