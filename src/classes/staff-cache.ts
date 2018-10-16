import { config } from "node-config-ts";
import { Staff, TStaff } from "../constants/core";
import {
  IGetStaffResponse,
  IGetStaffResult,
  IStaff,
  IStaffMembers
} from "../interfaces/mb_staff";
import { makeRequest, setRequest } from "../request";
import { GetStaff } from "../staff";
import { TServiceMethod } from "../types/core";
import { TSiteID } from "../types/site";

// There should only ever be a single instance of the Staff Cache Array

type TStaffCache = Map<TSiteID, IStaffMembers>;

const StaffCache: TStaffCache = new Map<TSiteID, IStaffMembers>();

export function getStaffFromCache(
  siteID: TSiteID,
  staffID?: string,
  firstName?: string,
  lastName?: string
): IStaff | null {
  if (StaffCache.get(siteID) === undefined) {
    // Initialize the cache entry for this site
    // GetStaff for siteID
    let result: IGetStaffResult;
    let response: IGetStaffResponse;
    const requestParms = {
      error: undefined,
      request: undefined,
      service: Staff as TStaff,
      serviceMethod: GetStaff as TServiceMethod,
      soapClientPromise: undefined
    };
    response = (makeRequest(setRequest(requestParms)) as IGetStaffResponse);
    result = response.GetStaffResult;
    StaffCache.set(siteID, result.StaffMembers);
  }
  let staff = null;
  const Staffs = StaffCache.get(siteID) as IStaffMembers;
  Staffs.Staff.forEach(element => {
    if (staffID !== undefined) {
      if (element.ID === staffID) {
        staff = element;
      }
    } else {
      if (firstName !== undefined && lastName !== undefined) {
        if (element.FirstName === firstName && element.LastName === lastName) {
          staff = element;
        }
      }
    }
  });
  return staff;
}

// main()
