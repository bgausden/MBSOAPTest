import soap = require('soap');

//import { stringify } from 'querystring';

const wsdlUrl = 'https://api.mindbodyonline.com/0_5_1/SiteService.asmx?wsdl';


interface IUserCredentials {
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

interface IGetResourcesParam {
  locationid: number, 
  sessiontypeid: number, 
  startdatetime: Date, 
  enddatetime: Date
}

interface IPagingParam {
  pagesize: number,
  currentpageindex: number
}

enum EDetail {
  "Full",
  "Basic",
  "Bare"
}

class CUserCredentials implements IUserCredentials {
  constructor(public username: string, public password: string, public siteids: { "int": number }, public locationid: number) { }
}

class CSourceCredentials implements ISourceCredentials {
  constructor(public sourcename: string, public password: string, public siteids: { "int": number }, public usercredentials: IUserCredentials, public LocationID: number,
    public SessionTypeIDs: number, public StartDateTime: string, public EndDateTime: string) { }
}

class CGetResourcesArgs {
  constructor(public userCredentials: IUserCredentials, public sourceCredentials: ISourceCredentials, getresourcesparam: IGetResourcesParam, pagingparam: IPagingParam, detail: EDetail ) { }
}



//const cred = new CUserCredentials("Siteowner", "apitest1234", [-99], 0);
/* const userCred = new CUserCredentials(
  userCreds["Username"],
  userCreds["Password"],
  userCreds["SiteIDs"],
  userCreds["LocationID"]
); */

const userCreds: IUserCredentials =
  {
    username: 'Siteowner',
    password: 'apitest1234',
    siteids: { 'int': -99 }, //array of site IDs (usually only one) represented as a JSON object
    locationid: 0
  };

const sourceCreds: ISourceCredentials = {
  sourcename: 'LissomeHongKongLimited',
  password: 'oHmyTX0H/pciVoPW35pwahivDsE=',
  siteids: { 'int': -99 },
  usercredentials: userCreds
};

//TODO use object composition to join userCredentials and sourceCredentials? Need userCredentials to be a prop value.

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
