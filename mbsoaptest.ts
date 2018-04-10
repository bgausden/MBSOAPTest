import soap = require('soap');

//import { stringify } from 'querystring';

const wsdlUrl = 'https://api.mindbodyonline.com/0_5_1/SiteService.asmx?wsdl';

const userCreds =
  {
    Username: 'Siteowner',
    Password: 'apitest1234',
    SiteIDs: {'int':-99}, //array of site IDs (usually only one)
    LocationID: 0
  };

  const sourceCreds = {
    SourceName: 'LissomeHongKongLimited',
    Password: 'oHmyTX0H/pciVoPW35pwahivDsE=',
    SiteIDs: { 'int': '-99' },
    userCreds
  };
    

/* var args = { name: 'value' };
soap.createClient(url, function (err, client) {
  if (err) {
    return stringify(err);
  }
  console.log("describe", client.describe());
}); */

/* interface ISoapClientCallback {
  (err :any, client :soap.Client) :void;
} */

/* var callback = (err :string, client :soap.Client) :void => {};
 */

class CUserCredentials {
  constructor(public username: string, public password: string, public siteids: number[], public locationid: number) { }
}

class CSourceCredentials {
  constructor(public sourcename: string, password: string, siteids: number[], usercredentials: CUserCredentials, LocationID: number,
    SessionTypeIDs: number, StartDateTime: string, EndDateTime: string, ) { }
}

interface IUserCredentials {
  username: string, password: string, siteids: JSON, locationid: number
}

interface ISourceCredentials {
  sourcename: string, password: string, siteids: number[], usercredentials: IUserCredentials
}

class CGetResourcesArgs {
  constructor(public userCredentials: CUserCredentials, public sourceCredentials: CSourceCredentials) { }
}

//const cred = new CUserCredentials("Siteowner", "apitest1234", [-99], 0);
/* const userCred = new CUserCredentials(
  userCreds["Username"],
  userCreds["Password"],
  userCreds["SiteIDs"],
  userCreds["LocationID"]
); */

soap.createClient(wsdlUrl, (err, client): void => {
  const get_resources_args = {
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
  };

  let GetResources = <((get_resources_args: any, callback: (err: any, result: any, raw: any, soapHeader: any) => void) => void)>client['GetResources'];
  GetResources(get_resources_args, (err, result, raw, soapHeader): void => { console.log(raw) });

  //console.log(JSON.stringify(client.describe(),null,4));
  //console.log(Object.keys(client));
  //console.log(Object.getOwnPropertyDescriptor(client,'GetResources'));

  //client['GetResources'](args,(err: any, result: any, raw: any, soapHeader: any) );
  //client['GetResources'](args,(err :any, result :any, raw :any, soapHeader:any ) :void => {console.log(result)})

});
