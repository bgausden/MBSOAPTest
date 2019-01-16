
import { IStaff } from "./mb_staff";

import { IClient } from "./mb_client";

import { IResources } from "./mb_site";
import { IProgram, ISessionType } from "./site";

export interface IAppointment {
    [key: string]: any;
    ID: string;
    Status: string;
    StartDateTime: Date;
    EndDateTime: Date;
    Notes: string;
    StaffRequested: boolean;
    Program: IProgram;
    SessionType: ISessionType;
    Location: Location;
    Staff: IStaff;
    Client: IClient;
    FirstAppointment: boolean;
    Resources: IResources;
  }

  export interface IGetStaffAppointmentsResult {
    GetStaffAppointmentsResult: {
      Appointments: {
        Appointment: IAppointment[];
      };
    };
  }
