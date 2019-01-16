import { config } from "node-config-ts";
import { GetStaff } from "src/constants/staff";
import { Staff } from "../constants/core";
import { IRequestParms } from "../interfaces/core";
import {
  IGetStaffResponse,
  IGetStaffResult,
  IStaff,
  IStaffMembers
} from "../interfaces/mb_staff";
import { makeRequest, setRequest } from "../request";
import { TServiceMethod } from "../types/core";
import { TSiteID } from "../types/site";
import { TFirstName, TLastName, TStaffID} from "../types/staff"

// There should only ever be a single instance of the Staff Cache Array

type TStaffCache = Map<TSiteID, IStaffMembers>;

const StaffCache: TStaffCache = new Map<TSiteID, IStaffMembers>();

/* getStaffFromCache(): look up a member of staff by siteID  and  (staffID or  FirstName+LastName). If the cache for the siteID is empty, query MB
    to populate the cache for that siteID.
    Either a IStaff is returned or if no matching staffmember is located, return null. */
// TODO: Support wildcard queries (including full wildcard to return all staff at a location or all staff at all locations)
export function getStaffFromCache(
  siteID: TSiteID,
  staffID?: TStaffID,
  firstName?: TFirstName,
  lastName?: TLastName
): IStaff | null {
  if (StaffCache.get(siteID) === undefined) {
    // Initialize the cache entry for this site by querying MB
    // GetStaff for siteID
    let result: IGetStaffResult;
    let response: IGetStaffResponse;
    // requestParms is the guts of the query to MB
    const requestParms: IRequestParms = {
      error: undefined,
      request: undefined,
      service: Staff,
      serviceMethod: GetStaff as TServiceMethod,
      soapClientPromise: undefined
    };
    response = (makeRequest(setRequest(requestParms)) as IGetStaffResponse);
    result = response.GetStaffResult;
    StaffCache.set(siteID, result.StaffMembers);
    // Better in one line? Pretty hard to read... Maybe better in 3 lines.
    // StaffCache.set(siteID, (makeRequest(setRequest(requestParms)) as IGetStaffResponse).GetStaffResult.StaffMembers)
  }
  let staff: IStaff | null = null;
  const Staffs = StaffCache.get(siteID) as IStaffMembers;
  Staffs.Staff.forEach(element => {
    if (staffID !== undefined) { // search for the staffID
      if (element.ID === staffID) {
        staff = element;
      }
    } else { // we don't have a staffID to search for so instead search for 1st and 2nd name in the cache
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

if (getStaffFromCache(0,"0" ) !== null) {
    // dump to the console
}

/* Testing
* Query for all sites
* Query for all staff at one of the sites
* Start with empty/missing cache
* Query for staffID == 0 (owner). Should always succeed.
* Check that returned object is IStaff
* Query or a different staffID
*/
