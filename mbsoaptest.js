"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const soap = require("soap");
//import { stringify } from 'querystring';
var url = 'https://api.mindbodyonline.com/0_5_1/SiteService.asmx?wsdl';
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
    constructor(username, password, siteids, locationid) {
        this.username = username;
        this.password = password;
        this.siteids = siteids;
        this.locationid = locationid;
    }
}
class CSourceCredentials {
    constructor(sourcename, password, siteids, usercredentials, LocationID, SessionTypeIDs, StartDateTime, EndDateTime) {
        this.sourcename = sourcename;
    }
}
class CGetResourcesArgs {
    constructor(userCredentials, sourceCredentials) {
        this.userCredentials = userCredentials;
        this.sourceCredentials = sourceCredentials;
    }
}
const cred = new CUserCredentials("Siteowner", "apitest1234", [-99], 0);
soap.createClient(url, (err, client) => {
    const get_resources_args = {
        Request: {
            SourceCredentials: {
                SourceName: 'LissomeHongKongLimited',
                Password: 'oHmyTX0H/pciVoPW35pwahivDsE=',
                SiteIDs: { 'int': '-99' },
                UserCredentials: {
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
    let GetResources = client['GetResources'];
    GetResources(get_resources_args, (err, result, raw, soapHeader) => { console.log(raw); });
    //console.log(JSON.stringify(client.describe(),null,4));
    //console.log(Object.keys(client));
    //console.log(Object.getOwnPropertyDescriptor(client,'GetResources'));
    //client['GetResources'](args,(err: any, result: any, raw: any, soapHeader: any) );
    //client['GetResources'](args,(err :any, result :any, raw :any, soapHeader:any ) :void => {console.log(result)})
});
//# sourceMappingURL=mbsoaptest.js.map