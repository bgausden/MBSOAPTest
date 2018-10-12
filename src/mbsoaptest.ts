import BluebirdPromise from "bluebird";
import { config } from 'node-config-ts';
import prettyjson = require("prettyjson");
import { Client, createClient, ISoapMethod } from "soap";
import { Category } from "typescript-logging";
import xmlformat = require("xml-formatter");
import {
  appointmentWSDLURL,
  Confirmed,
  defaultGetScheduleItemsRequest,
  defaultGetStaffAppointmentsRequest,
  GetScheduleItems,
  GetStaffAppointments,
  IAppointment,
  IGetStaffAppointmentsResult,
  TAppointmentMethod
} from "./appointment";
import { Appointment, Site, Staff } from "./constants/core";
import { siteWSDLURL, staffWSDLURL } from "./constants/mb_urls";
import { defaultSiteIDs, MBAPIKey } from "./defaults";
import { IRequestParms } from "./interfaces/core";
import { ISoapRequest } from "./mb_soap";
import { CReminder } from "./reminder";
import { handleGetStaffAppointments } from "./resultHandlers/get_staff_appointments";
import {
  defaultGetResourcesRequest,
  defaultGetSitesRequest,
  GetLocations,
  GetResources,
  GetSites,
  TSiteMethod
} from "./site";
import { defaultGetStaffRequest, GetStaff, TStaffMethod } from "./staff";
import { TServices } from "./types/core";
import { TServiceMethod } from "./types/core";
import {
  catAppointment,
  catGetStaffAppointments,
  catSite,
  catStaff,
  catUnknown
} from "./typescript-logging-config";

// This line kill all logging - why? TODO
// CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Info));

export function createSoapClientAsync(wsdlURL: string): BluebirdPromise<Client> {
  return new BluebirdPromise((resolve: any, reject: any) => {
    createClient(
      wsdlURL,
      (err: any, client: Client): void => {
        client.addHttpHeader("API-key", MBAPIKey);
        client.addHttpHeader("SiteId", defaultSiteIDs);
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

// TODO return a TSOAPResponse from handleResult()
// need this in order to populate the staff cache

function handleResult(
  svc: TServices,
  svcMethod: TSiteMethod | TAppointmentMethod | TStaffMethod,
  result: any
): void {
  switch (svc) {
    case Appointment:
      switch (svcMethod as string) {
        case GetStaffAppointments:
          handleGetStaffAppointments(svc, svcMethod, result);
          break;

        default: // unknown Appointment method
          const errString: string =
            "Currently not able to process " + " " + svc + ":" + svcMethod;
          catUnknown.debug(() => errString);
          throw new Error(errString);
          break;
      }
      break;

    default:
      break;
  }
}

function setRequest(requestParms: IRequestParms): IRequestParms {
  /* const service = requestParms.service;
  const serviceMethod = requestParms.serviceMethod;
  let parentCategory = requestParms.parentCategory;
  let loggingCategory = requestParms.loggingCategory;
  const soapClientPromise = requestParms.soapClientPromise;
  let request = requestParms.request; */

  switch (requestParms.service) {
    case Site as string: {
      switch (requestParms.serviceMethod) {
        case GetResources as string: {
          if (requestParms.request === undefined) {
            requestParms.request = defaultGetResourcesRequest;
          }
          break;
        }

        case GetSites as string: {
          if (requestParms.request === undefined) {
            requestParms.request = defaultGetSitesRequest;
          }
          break;
        }

        default:
          requestParms.error =
            "Unknown MindBody" +
            requestParms.service +
            'service method " ' +
            requestParms.serviceMethod +
            '"specified.';
          throw new Error(requestParms.error);
      } // end switch serviceMethod
      break;
    } // end case Site

    case Appointment as string: {
      // case SOAP Service == Appointment
      switch (requestParms.serviceMethod) {
        case GetStaffAppointments as string: {
          if (requestParms.request === undefined) {
            requestParms.request = defaultGetStaffAppointmentsRequest;
          }
          break;
        }

        case GetScheduleItems as string: {
          if (requestParms.request === undefined) {
            requestParms.request = defaultGetScheduleItemsRequest;
          }
          break;
        }

        default:
          requestParms.error =
            "Unknown MindBody" +
            requestParms.service +
            'service method " ' +
            requestParms.serviceMethod +
            '"specified.';
          throw new Error(requestParms.error);
      } // end switch(serviceMethod)
      break;
    } // end case Appointment

    case Staff as string: {
      // case SOAP Service == Staff
      switch (requestParms.serviceMethod) {
        case GetStaff as string: {
          // case SOAP Method = GetStaff
          if (requestParms.request === undefined) {
            requestParms.request = defaultGetStaffRequest;
          }
          break;
        }

        default:
          // We don't know what this Staff method is
          requestParms.error =
            "Unknown MindBody" +
            requestParms.service +
            'service method " ' +
            requestParms.serviceMethod +
            '"specified.';

          throw new Error(requestParms.error);
      } // end switch(serviceMethod)
      break;
    } // end case Staff
  } // end switch(service)
  return requestParms;
}

function makeRequest(requestParms: IRequestParms) {
  const service = requestParms.service;
  const serviceMethod = requestParms.serviceMethod;
  let soapClientPromise = requestParms.soapClientPromise;
  const request = requestParms.request;
  let serviceCategory: Category;
  let methodCategory: Category;

  switch (service) {
    case Site as string: {
      serviceCategory = catSite;
      soapClientPromise = createSoapClientAsync(siteWSDLURL);
      break;
    }
    case Appointment as string: {
      // case SOAP Service == Appointment
      serviceCategory = catAppointment;
      soapClientPromise = createSoapClientAsync(appointmentWSDLURL);
      break;
    }
    case Staff as string: {
      // case SOAP Service == Staff
      serviceCategory = catStaff;
      soapClientPromise = createSoapClientAsync(staffWSDLURL);
      break;
    }
    default:
    catUnknown.debug("Unknown MindBody" +
    service +
    'service method " ' +
    serviceMethod +
    '"specified.');

      throw new Error(
        "Unknown MindBody" +
          service +
          'service method " ' +
          serviceMethod +
          '"specified.'
      );
  } // end switch(service)

  methodCategory = new Category(
    "cat" + requestParms.serviceMethod,
    serviceCategory
  );

  // @ts-ignore TS2454
  soapClientPromise.then(client => {
    const soapMethod = client[serviceMethod] as ISoapMethod;
    soapMethod(request, (err, result) => {
      // console.log(`err: \n\n${JSON.stringify(err, undefined, 2)}`);
      // console.log(`result: \n\n${JSON.stringify(result, undefined, 2)}`);
      if (err) {
        serviceCategory.debug(
          // @ts-ignore TS2345:
          () => `\n\nlastRequest: \n\n${xmlformat(client.lastRequest)}\n`
        );
        throw new Error(JSON.stringify(err));
      } else {
        methodCategory.debug(
          // @ts-ignore TS2345:
          () => `\n\nlastRequest: \n\n${xmlformat(client.lastRequest)}\n`
        );
        methodCategory.debug(
          () => `\n\nresult: \n\n${JSON.stringify(result, undefined, 2)}\n`
        );

        // TODO maybe don't need a default handler for each service/method?
        // handleResult(service, serviceMethod, result);
      }
    });
  });
  // @ts-ignore TS2454
  soapClientPromise.catch((reason: any) => {
    throw new Error(reason as string);
  });

  console.log(`Done async\n`);
}

// main()
const debugRequestParms: IRequestParms = {
  error: undefined,
  request: undefined,
  service: Appointment,
  serviceMethod: GetStaffAppointments,
  soapClientPromise: undefined
};

setRequest(debugRequestParms);
makeRequest(setRequest(debugRequestParms));
