import { IGetScheduleItemsParamsExternal } from "src/interfaces/appointment";

import { defaultPageDetail, defaultPagingParams, defaultStaffCredentials, defaultStaffIDs, defaultUserCredentials, now, tomorrow } from "./core";

import { ISoapRequest } from "src/interfaces/core";

import {CGetScheduleItemsParams} from "../classes/appointment"

export const GetStaffAppointments = "GetStaffAppointments";

export const GetScheduleItems = "GetScheduleItems";
//  export type GetScheduleItems = typeof GetScheduleItems;

export const Confirmed = "Confirmed";

const defaultGetScheduleItemsParams: IGetScheduleItemsParamsExternal = new CGetScheduleItemsParams(
    // defaultLocationIDs,
    undefined,
    defaultStaffIDs,
    // defaultStartDate,
    now,
    // defaultEndDate,
    tomorrow,
    // defaultIgnorePrepFinishTimes,
    undefined
  ).toString();

  // required getScheduleItems args appear to be UserCredentials + PagingDetails + DetailLevel
  // + StaffIDs + LocationID + (optional) StartDate + (optional) EndDate
  // note this is *not* consistent with the MB documentation but empirically, this is what works
  export const defaultGetScheduleItemsRequest: ISoapRequest = {
    Request: Object.assign(
      defaultUserCredentials.toString(),
      defaultPagingParams,
      defaultPageDetail,
      defaultGetScheduleItemsParams
    )
  };

  /* export const defaultGetStaffAppointmentsArgs: IGetStaffAppointmentsParamsExternal = Object.assign(
      defaultStaffCredentials,
      defaultSourceCredentials,
      defaultUserCredentials,
      defaultGetScheduleItemsParams,
      defaultPagingParams,
      defaultPageDetail
  ); */

  export const defaultGetStaffAppointmentsRequest: ISoapRequest = {
    Request: Object.assign(
      defaultStaffCredentials.toString(),
      // defaultSourceCredentials.toString(),
      // defaultUserCredentials.toString(),
      defaultGetScheduleItemsParams,
      defaultPagingParams,
      defaultPageDetail,
      defaultStaffIDs.toString()
    )
  };
