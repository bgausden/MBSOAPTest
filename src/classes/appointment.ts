import { CLocationIDs } from "src/interfaces/core";

import { CStaffIDs } from "./core";

import { IGetScheduleItemsParamsExternal, IGetScheduleItemsParamsInternal } from "src/interfaces/appointment";

export class CGetScheduleItemsParams implements IGetScheduleItemsParamsInternal {
    constructor(
      public LocationIDs?: CLocationIDs,
      public StaffIDs?: CStaffIDs,
      public StartDate?: Date,
      public EndDate?: Date,
      public IgnorePrepFinishTimes?: boolean
    ) {}
    public toString(): IGetScheduleItemsParamsExternal {
      const params = {};
      if (this.LocationIDs !== undefined) {
        Object.assign(params, { LocationIDs: this.LocationIDs.toString() });
      }
      if (this.StaffIDs !== undefined) {
        Object.assign(params, { StaffIDs: this.StaffIDs.toString() });
      }
      if (this.StartDate !== undefined) {
        Object.assign(params, { StartDate: this.StartDate.toJSON() });
      }
      if (this.EndDate !== undefined) {
        Object.assign(params, { EndDate: this.EndDate.toJSON() });
      }
      if (this.IgnorePrepFinishTimes !== undefined) {
        Object.assign(params, {
          IgnorePrepFinishTimes: JSON.stringify(this.IgnorePrepFinishTimes)
        });
      }
      return params;

      /* TODO there should be a way to iterate through the props and then do the assignment.
         for (const p of this) {
            if (this[p] !== undefined) {
              params = Object.assign(params, this[p]);
            }
          } */
    }
  }
