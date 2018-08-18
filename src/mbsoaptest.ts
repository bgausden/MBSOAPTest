// tslint:disable max-classes-per-file callable-types interface-over-type-literal
import Promise from "bluebird";
import prettyjson = require("prettyjson");
import { Client, createClient, IOptions, ISoapMethod } from "soap";
import { Category } from "typescript-logging";
import xmlformat = require("xml-formatter");
import * as appointment from "./appointment";
import * as core from "./core";
import * as defaults from "./defaults";
import * as mbsoap from "./mbsoap";
import * as site from "./site";
import * as staff from "./staff";

import {
  catAppointment,
  catGetScheduleItems,
  catGetStaff,
  catGetStaffAppointments,
  catSite,
  catStaff,
  catUnknown
} from "./typescript-logging-config";

type TServiceMethod =
  | site.TMBSiteMethod
  | staff.TMBStaffMethod
  | appointment.TMBAppointmentMethod;

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

function handleResult(svc: core.TMBServices, svcMethod: site.TMBSiteMethod | appointment.TMBAppointmentMethod | staff.TMBStaffMethod, result:any):void {
  switch (svc as string) {
    case "Appointment":
    switch (svcMethod as string) {
      case "GetStaffAppointments":
        console.log(JSON.stringify(result.GetStaffAppointmentsResult.Appointments));
        catGetStaffAppointments.debug(() => `\n\nAppointments: \n\n${prettyjson.render(result.GetStaffAppointmentsResult.Appointments)}\n\n` );
        break;
    
      default:
      const errString: string = "Currently not able to process "+" "+ svc+":"+svcMethod;
      catUnknown.debug(() => errString)
      throw new Error(errString);
        break;
    }
      break;
  
    default:
      break;
  }
}

const service: core.TMBServices = "Appointment";
const serviceMethod: TServiceMethod = "GetStaffAppointments";
let parentCategory: Category;
let loggingCategory: Category;
let request: mbsoap.TSoapRequest;
// let MBClientPromise: () => Promise<Client>;
let clientPromise: Promise<Client>;

switch (service) {
  case "Site" as string: {
    clientPromise = createSoapClientAsync(site.siteWSDLURL);
    parentCategory = catSite;
    loggingCategory = new Category("cat" + serviceMethod, parentCategory);
    switch (serviceMethod) {
      case "GetResources" as string: {
        request = site.defaultGetResourcesRequest;
        break;
      }
      case "GetSites" as string: {
        request = site.defaultGetSitesRequest;
        break;
      }
      default:
        throw new Error(
          "Unknown MindBody" +
            service +
            'service method " ' +
            serviceMethod +
            '"specified.'
        );
    } // end switch serviceMethod
    break;
  } // end case Site
  case "Appointment" as string: {
    // case SOAP Service == Appointment
    clientPromise = createSoapClientAsync(appointment.appointmentWSDLURL);
    parentCategory = catAppointment;
    loggingCategory = new Category("cat" + serviceMethod, parentCategory);
    switch (serviceMethod) {
      case "GetStaffAppointments" as string: {
        request = appointment.defaultGetStaffAppointmentsRequest;
        break;
      }
      case "GetScheduleItems" as string: {
        request = appointment.defaultGetScheduleItemsRequest;
        break;
      }
      default:
        throw new Error(
          "Unknown MindBody" +
            service +
            'service method " ' +
            serviceMethod +
            '"specified.'
        );
    } // end switch(serviceMethod)
    break;
  } // end case Appointment
  case "Staff" as string: {
    // case SOAP Service == Staff
    clientPromise = createSoapClientAsync(staff.staffWSDLURL);
    parentCategory = catStaff;
    loggingCategory = new Category("cat" + serviceMethod, parentCategory);
    switch (serviceMethod) {
      case "GetStaff" as string: {
        request = staff.defaultGetStaffRequest;
        break;
      }
      default:
        throw new Error(
          "Unknown MindBody" +
            service +
            'service method " ' +
            serviceMethod +
            '"specified.'
        );
    } // end switch(serviceMethod)
    break;
  } // end case Staff
} // end switch(service)

// @ts-ignore TS2454
clientPromise.then(client => {
  const soapMethod = client[serviceMethod] as ISoapMethod;
  soapMethod(request, (err, result, raw, soapHeader) => {
    // console.log(`err: \n\n${JSON.stringify(err, undefined, 2)}`);
    // console.log(`result: \n\n${JSON.stringify(result, undefined, 2)}`);
    if (err) {
      loggingCategory.debug(
     // @ts-ignore TS2345:
() => `\n\nlastRequest: \n\n${xmlformat(client.lastRequest)}\n`
      );
      throw new Error(JSON.stringify(err));
    } else {
      loggingCategory.debug(
        // @ts-ignore TS2345:
        () => `\n\nlastRequest: \n\n${xmlformat(client.lastRequest)}\n`
      );
      loggingCategory.debug(
        () => `\n\nresult: \n\n${JSON.stringify(result, undefined, 2)}\n`
      );
      handleResult(service, serviceMethod, result);
    }
  });
});
// @ts-ignore TS2454
clientPromise.catch((reason: any) => {
  throw new Error(reason as string);
});

console.log(`Done async\n`);
