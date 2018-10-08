import { ISoapServiceMethod } from 'soap';
import { IGetStaffResult, IStaff, IStaffMembers } from '../interfaces/mb_staff';
import {TLocationIDs, TSiteID} from '../types/site';

// There should only ever be a single instance of the Staff Cache Array

type TStaffCache =  Map<TSiteID,IStaff[]>;

const StaffCache: TStaffCache =  new Map<TSiteID,IStaffMembers>();

function getStaffFromCache(siteID: TSiteID, staffID?: string, firstName?: string, lastName?: string): IStaff | undefined {
    if  (StaffCache.get(siteID) === undefined) {
        // Initialize the cache entry for this site
        // GetStaff for siteID
        let result: IGetStaffResult
        StaffCache.set(siteID, result.StaffMembers.Staff)
    }
    let staff:IStaff;
    const Staffs = StaffCache.get(siteID) as IStaff[];
    Staffs.forEach(element => {
        if (staffID !== undefined) {
            if (element.ID === staffID) {
                staff = element;
            }
        }
        else {
            if ((firstName !== undefined) && (lastName !== undefined)) {
                if ((element.FirstName === firstName) && (element.LastName === lastName)) {
                    staff = element;
                }
            }
        }
    });
    return staff;
}
