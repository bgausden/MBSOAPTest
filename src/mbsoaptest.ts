// tslint:disable max-classes-per-file callable-types interface-over-type-literal
import Promise from "bluebird";
import { Client, createClient, IOptions, ISoapMethod } from "soap";
import { Category } from "typescript-logging";
import * as xmlformatter from "xml-formatter";
import * as appointment from "./appointment";
import * as core from "./core";
import * as defaults from "./defaults";
import {
    catAppointment,
    catGetScheduleItems,
    catGetStaffAppointments,
    catSite
} from "./typescript-logging-config";




type TMBSiteMethod =
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


const siteWSDLURL =
    "https://api.mindbodyonline.com/0_5_1/SiteService.asmx?wsdl";

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
            StartDateTime: this.startdatetime.toJSON()
        };
    }
}

const defaultGetResourcesParams: IGetResourcesParamsExternal = new CGetResourcesParams(
    defaults.defaultLocationIDs,
    defaults.defaultSessionTypeIDs,
    defaults.midnight,
    defaults.midnight
).toString();

const getResourcesArgs: object = {
    Request: Object.assign(defaultGetResourcesParams, defaults.defaultPagingParams)
};




const options: IOptions = {
    disableCache: false
};

export type TSoapRequest = {
    Request: IGetResourcesParamsExternal | appointment.IGetScheduleItemsParamsExternal;
};

function request(
    params: IGetResourcesParamsExternal | appointment.IGetScheduleItemsParamsExternal
): TSoapRequest {
    // return an Object with one property "Request" whose value is the param Object
    return { Request: params };
}

function createSoapClientAsync(wsdlURL: string): Promise<Client> {
    return new Promise((resolve: any, reject: any) => {
        createClient(
            wsdlURL,
            (err: any, client: Client): void => {
                client.addHttpHeader("API-key", defaults.MBAPIKey);
                client.addHttpHeader("SiteId", defaults.defaultSiteIDs);
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(client);
                }
            }
        );
    });
}

const siteClientPromise: Promise<Client> = createSoapClientAsync(siteWSDLURL);
const appointmentClientPromise: Promise<Client> = createSoapClientAsync(
    appointment.appointmentWSDLURL
);



// the callback for the soap method can be defined independently but we then lose the ability to interact with the "client" object.
// while we're hacking on the code, it's probably easier to retain access to the client (e.g. client.LastRequest by keeping the callback
// definition in-line with the soap method call)
interface ISoapMethodCallback {
    (err: any, result: object, raw: any, soapHeader: any): void;
}
const getScheduleItemsCallback: ISoapMethodCallback = (
    err,
    result,
    raw,
    soapHeader
) => {
    console.log(`err: \n\n${JSON.stringify(err, undefined, 2)}`);
    // console.log(`result: \n\n${JSON.stringify(result, undefined, 2)}`);
    catGetScheduleItems.debug(
        () => `\n\nresult: \n\n${JSON.stringify(result, undefined, 2)}`
    );
    // you cannot access client in this context
    // console.log(`lastRequest: \n\n${client.lastRequest}\n`);
};

const service: core.TMBServices = "Appointment";
const serviceMethod: appointment.TMBAppointmentMethod | TMBSiteMethod =
    "GetStaffAppointments";
let mbargs: any = {};
let parentCategory: Category;
let loggingCategory: Category;
switch (serviceMethod) {
    case "GetStaffAppointments" as string:
        mbargs = appointment.getStaffAppointmentsArgs as any;
        parentCategory = catAppointment;
        loggingCategory = new Category("cat" + serviceMethod, parentCategory);
        break;
    case "GetResources" as string:
        mbargs = getResourcesArgs as any;
        parentCategory = catSite;
        loggingCategory = new Category("cat" + serviceMethod, parentCategory);
    default:
        throw new Error("Unknown MindBody service specified.");
        break;
}

appointmentClientPromise.then(client => {
    const soapMethod = client[serviceMethod] as ISoapMethod;
    soapMethod(request(mbargs), (err, result, raw, soapHeader) => {
        // console.log(`err: \n\n${JSON.stringify(err, undefined, 2)}`);
        // console.log(`result: \n\n${JSON.stringify(result, undefined, 2)}`);
        loggingCategory.debug(
            () => `\n\nresult: \n\n${JSON.stringify(result, undefined, 2)}\n`
        );
        loggingCategory.debug(
            () =>
                `\n\nlastRequest: \n\n${JSON.stringify(
                    client.lastRequest,
                    undefined,
                    2
                )}\n`
        );
    });
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
