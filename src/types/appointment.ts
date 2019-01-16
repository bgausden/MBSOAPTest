import { GetScheduleItems, GetStaffAppointments } from "src/constants/appointments";

export type TAppointmentMethod = typeof GetStaffAppointments | typeof GetScheduleItems;
