// tslint:disable max-classes-per-file callable-types interface-over-type-literal
import Promise from "bluebird";
import { Client, createClient, IOptions, ISoapMethod } from "soap";
import { Category } from "typescript-logging";
import * as xmlformatter from "xml-formatter";
import * as appointment from "./appointment";
import * as core from "./core";
import * as defaults from "./defaults";
import * as mbsoap from "./mbsoap";
import * as site from "./site";

import {
  catAppointment,
  catGetScheduleItems,
  catGetStaffAppointments,
  catSite
} from "./typescript-logging-config";

const options: IOptions = {
  disableCache: false
};

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

// the callback for the soap method can be defined independently but we then lose the ability to interact with the "client" object.
// while we're hacking on the code, it's probably easier to retain access to the client (e.g. client.LastRequest by keeping the callback
// definition in-line with the soap method call)
/* interface ISoapMethodCallback {
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
}; */

const service: core.TMBServices = "Appointment";
const serviceMethod: appointment.TMBAppointmentMethod | site.TMBSiteMethod =
  "GetStaffAppointments";
let parentCategory: Category;
let loggingCategory: Category;
let request: mbsoap.TSoapRequest;
let MBClientPromise: () => Promise<Client>;
switch (service) {
  case "Site" as string:
    MBClientPromise = () => createSoapClientAsync(site.siteWSDLURL);
    parentCategory = catSite;
    loggingCategory = new Category("cat" + serviceMethod, parentCategory);
    switch (serviceMethod) {
      case "GetResources" as string:
        request = site.defaultGetResourcesRequest;
        break;
      case "GetSites" as string:
        request = site.defaultGetSitesRequest;
        break;
      default:
        throw new Error(
          "Unknown MindBody" +
            service +
            'service method " ' +
            serviceMethod +
            '"specified.'
        );
        break;
    } // end switch serviceMethod
    break;
  case "Appointment" as string:
    MBClientPromise = () =>
      createSoapClientAsync(appointment.appointmentWSDLURL);
    parentCategory = catAppointment;
    loggingCategory = new Category("cat" + serviceMethod, parentCategory);
    switch (serviceMethod) {
      case "GetStaffAppointments" as string:
        request = appointment.defaultGetStaffAppointmentsRequest;
        break;
      case "GetScheduleItems" as string:
        request = appointment.defaultGetScheduleItemsRequest;
        break;
      default:
        throw new Error(
          "Unknown MindBody" +
            service +
            'service method " ' +
            serviceMethod +
            '"specified.'
        );
        break;
    } // end switch serviceMethod
} // end switch(service)

/* switch (serviceMethod) {
  case "GetStaffAppointments" as string:
    mbargs = appointment.getStaffAppointmentsArgs as any;
    parentCategory = catAppointment;
    loggingCategory = new Category("cat" + serviceMethod, parentCategory);
    break;
  case "GetResources" as string:
    mbargs = site.getResourcesArgs as any;
    parentCategory = catSite;
    loggingCategory = new Category("cat" + serviceMethod, parentCategory);
  default:
    throw new Error("Unknown MindBody service specified.");
    break;
} */

// @ts-ignore TS2454
MBClientPromise().then(client => {
  const soapMethod = client[serviceMethod] as ISoapMethod;
  soapMethod(request, (err, result, raw, soapHeader) => {
    // console.log(`err: \n\n${JSON.stringify(err, undefined, 2)}`);
    // console.log(`result: \n\n${JSON.stringify(result, undefined, 2)}`);
    if (err) {
      loggingCategory.debug(
        () =>
          `\n\nlastRequest: \n\n${JSON.stringify(
            client.lastRequest,
            undefined,
            2
          )}\n`
      );
      throw new Error(err);
    } else {
      loggingCategory.debug(
        () => `\n\nresult: \n\n${JSON.stringify(result, undefined, 2)}\n`
      );
    }
  });
  MBClientPromise().catch((reason: any) => {
    throw new Error(reason as string);
  });
});
console.log(`Done async\n`);
