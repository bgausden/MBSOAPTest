import BluebirdPromise from "bluebird";
import { config } from "node-config-ts";
import prettyjson from "prettyjson";
import { Client, createClient, ISoapMethod } from "soap";
import { Category } from "typescript-logging";
// import xmlformat = require("xml-formatter"); // is a Modular Library (contains module.exports= ) so need to use require() syntax. Legal but not really Typescript
// import * as xmlformat from "xml-formatter"; // doesn't work when importing a function
import xmlformat from "xml-formatter"; // alternative to using require() and works when the default export is a function
import {
  appointmentWSDLURL,
  defaultGetScheduleItemsRequest,
  defaultGetStaffAppointmentsRequest,
  GetScheduleItems,
  GetStaffAppointments
} from "./appointment";
import { getStaffFromCache } from "./classes/staff-cache";
import { Appointment, Site, Staff } from "./constants/core";
import { siteWSDLURL, staffWSDLURL } from "./constants/mb_urls";
import { defaultSiteIDs } from "./defaults";
import { IRequestParms } from "./interfaces/core";
import {
  defaultGetResourcesRequest,
  defaultGetSitesRequest,
  GetResources,
  GetSites
} from "./site";
import { defaultGetStaffRequest, GetStaff } from "./staff";
import { TSoapResponse } from "./types/core";
import {
  catAppointment,
  catSite,
  catStaff,
  catUnknown
} from "./typescript-logging-config";

// This line kill all logging - why? TODO
// CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Info));

export function createSoapClientAsync(
  wsdlURL: string
): BluebirdPromise<Client> {
  return new BluebirdPromise((resolve: any, reject: any) => {
    createClient(
      wsdlURL,
      (err: any, client: Client): void => {
        client.addHttpHeader("API-key", config.MBAPIKey);
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

export function setRequest(requestParms: IRequestParms): IRequestParms {
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

export function makeRequest(requestParms: IRequestParms): TSoapResponse {
  const service = requestParms.service;
  const serviceMethod = requestParms.serviceMethod;
  let soapClientPromise = requestParms.soapClientPromise;
  const request = requestParms.request;
  let serviceCategory: Category;
  let methodCategory: Category;
  let returnResult: TSoapResponse;

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
      catUnknown.debug(
        "Unknown MindBody" +
          service +
          'service method " ' +
          serviceMethod +
          '"specified.'
      );

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
      if (err) {
        if (config.DEBUG_REQUESTS) {
          serviceCategory.debug(
            // @ts-ignore TS2345:
            () => `\n\nlastRequest: \n\n${xmlformat(client.lastRequest)}\n`
          );
        }
        throw new Error(JSON.stringify(err));
      } else {
        returnResult = result;
        if (config.DEBUG_REQUESTS) {
          methodCategory.debug(
            // @ts-ignore TS2345:
            () => `\n\nlastRequest: \n\n${xmlformat(client.lastRequest)}\n`
          );
        }
        if (config.DEBUG) {
          methodCategory.debug(
            () => `\n\nresult: \n\n${prettyjson.render(result)}\n`
          );
        }

        // TODO maybe don't need a default handler for each service/method?
        // handleResult(service, serviceMethod, result);
      }
    });
  });
  // @ts-ignore TS2454
  soapClientPromise.catch((reason: any) => {
    throw new Error(reason as string);
  });

  if (config.DEBUG) {
    methodCategory.debug(() => `\n\nWaiting for MindBody\n`);
  }
  return returnResult!;
}

// main()
const debugRequestParms: IRequestParms = {
  error: undefined,
  request: undefined,
  service: config.service,
  serviceMethod: config.serviceMethod,
  soapClientPromise: undefined
};

makeRequest(setRequest(debugRequestParms));
// JSON.stringify(getStaffFromCache(config.SiteIDs, "100000024"));