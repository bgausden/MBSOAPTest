import { CLocationIDs, IStaffIDsExternal, IStaffIDsInternal } from "./core";

import { CStaffIDs } from "src/classes/core";

interface IGetAppointmentsParamsInternal {
  LocationIDs: number;
  StaffIDs: IStaffIDsInternal;
  StartDateTime: Date;
  EndDateTime: Date;
  IgnorePrepFinishTimes: boolean;
}

interface IGetStaffAppointmentsParamsExternal {
  LocationIDs: { int: number };
  StaffIDs: IStaffIDsInternal;
  StartDate: string;
  EndDate: string;
  IgnorePrepFinishTimes: boolean;
}

export interface IGetScheduleItemsParamsExternal {
  LocationIDs?: { int: number };
  StaffIDs?: IStaffIDsExternal;
  StartDate?: string;
  EndDate?: string;
  IgnorePrepFinishTimes?: boolean;
}

export interface IGetScheduleItemsParamsInternal {
  LocationIDs?: CLocationIDs;
  StaffIDs?: CStaffIDs;
  StartDate?: Date;
  EndDate?: Date;
  IgnorePrepFinishTimes?: boolean;
  toString: () => IGetScheduleItemsParamsExternal;
}
