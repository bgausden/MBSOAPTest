import soap = require('soap');

const enum EDetail {
  Full,
  Basic,
  Bare
}

const wsdlUrl = 'https://api.mindbodyonline.com/0_5_1/SiteService.asmx?wsdl';

const defaultUserCreds = {
  username: 'Siteowner',
  password: 'apitest1234',
  //siteids: { 'int': -99 }, this is what the soap library expects
  siteids: [-99],
  locationid: 0
};

const defaultSourceCreds = {
  sourcename: 'LissomeHongKongLimited',
  password: 'oHmyTX0H/pciVoPW35pwahivDsE=',
  siteids: { 'int': -99 },
  usercredentials: defaultUserCreds
};

const defaultGetResourceParams = {
  locationid: 0,
  sessiontypeid: 1,
  startdatetime: new Date(new Date().setHours(0, 0, 0, 0)),
  enddatetime: new Date(new Date().setHours(0, 0, 0, 0))
};

const defaultPagingparams = {
  pagesize: 10,
  currentpageindex: 0
};

const defaultDetail = EDetail.Basic;

interface IUserCredentials {
  username: string,
  password: string,
  siteids: number[],
  locationid: number
}

interface IMBSOAPUserCredentials {
  username: string,
  password: string,
  siteids: { "int": number }[],
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
  startdatetime: Date,
  enddatetime: Date
}

interface IPagingParams {
  pagesize: number,
  currentpageindex: number
}

class CUserCredentials implements IUserCredentials {
  constructor(public username: string, public password: string, public siteids: number[], public locationid: number) { };
  createMBSOAPUserCredentials(): IMBSOAPUserCredentials {
    let sids = new Array<{ "int": number }>();
    this.siteids.forEach((siteid, i) => sids[i] = { "int": siteid });
    return {
      username: this.username,
      password: this.password,
      siteids: sids,
      locationid: this.locationid
    }
  }
}

//const testUserCredentials: IMBSOAPUserCredentials = new CUserCredentials("barryg", "pass", [-99, -98, -97], 0).createMBSOAPUserCredentials();
//const testUserCredentials: IMBSOAPUserCredentials = new CUserCredentials(...defaultUserCreds);
//const testMBUCObject: IMBSOAPUserCredentials = testUserCredentials.createMBSOAPUserCredentials();

class CSourceCredentials implements ISourceCredentials {
  constructor(public sourcename: string, public password: string, public siteids: { "int": number }, public usercredentials: IUserCredentials, public LocationID: number,
    public SessionTypeIDs: number, public StartDateTime: string, public EndDateTime: string) { }
}

class CGetResourcesArgs {
  constructor(public userCredentials: IUserCredentials, public sourceCredentials: ISourceCredentials, getresourcesparam: IGetResourcesParams, pagingparam: IPagingParams, detail: EDetail) { }
}


//const userCreds: IUserCredentials = defaultUserCreds;
const sourceCreds: ISourceCredentials = defaultSourceCreds;
// TODO need to convert Date object to string representation so it can be consumed by soapClient
const getResourcesParams: IGetResourcesParams = defaultGetResourceParams;
const pagingParams: IPagingParams = defaultPagingparams;
const getResourceArgs: IGetResourcesParams = Object.assign(sourceCreds, getResourcesParams, pagingParams);

soap.createClient(wsdlUrl, (err, client): void => {
  /* const get_resources_args = {
    Request:
      {
        SourceCredentials:
          {
            SourceName: 'LissomeHongKongLimited',
            Password: 'oHmyTX0H/pciVoPW35pwahivDsE=',
            SiteIDs: { 'int': '-99' },
            UserCredentials:
              {
                Username: 'Siteowner',
                Password: 'apitest1234',
                SiteIDs: { 'int': '-99' },
                LocationID: '0'
              }
          },
        XMLDetail: 'Full',
        PageSize: '10',
        CurrentPageIndex: '0',
        LocationID: '0',
        SessionTypeIDs: '2',
        StartDateTime: '2018-04-17T14:00:00',
        EndDateTime: '2018-04-17T20:00:00'
      }
  }; */

  const get_resources_args = {};

  let GetResources = <((get_resources_args: any, callback: (err: any, result: any, raw: any, soapHeader: any) => void) => void)>client['GetResources'];
  GetResources(get_resources_args, (err, result, raw, soapHeader): void => { console.log(raw) });

  //console.log(JSON.stringify(client.describe(),null,4));
  //console.log(Object.keys(client));
  //console.log(Object.getOwnPropertyDescriptor(client,'GetResources'));

  //client['GetResources'](args,(err: any, result: any, raw: any, soapHeader: any) );
  //client['GetResources'](args,(err :any, result :any, raw :any, soapHeader:any ) :void => {console.log(result)})

});
