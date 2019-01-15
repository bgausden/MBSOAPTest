import { catGetStaffAppointments } from "../typescript-logging-config";

import { CReminder } from "../classes/CReminder";

import {
  Confirmed,
  IAppointment,
  IGetStaffAppointmentsResult,
  TAppointmentMethod
} from "../appointment";
import { TSiteMethod } from "../site";
import { TStaffMethod } from "../staff";
import { TServices } from "../types/core";

import prettyjson = require("prettyjson");

export function handleGetStaffAppointments(
  svc: TServices,
  svcMethod: TSiteMethod | TAppointmentMethod | TStaffMethod,
  result: any
): void {
  catGetStaffAppointments.debug(
    () =>
      `\n\nAppointments: \n\n${prettyjson.render(
        result.GetStaffAppointmentsResult.Appointments
      )}\n\n`
  );
  catGetStaffAppointments.debug(() => "Loading Appointments into Cache");
  const reminderCache = new Map<string, CReminder>();
  result = result as IGetStaffAppointmentsResult;
  result.GetStaffAppointmentsResult.Appointments.Appointment.forEach(
    (element: IAppointment) => {
      const key = element.ID;
      const reminder = new CReminder(
        element.ID,
        element.Client.FirstName,
        element.Status,
        element.SessionType.Name,
        element.Staff.FirstName,
        element.StartDateTime
      );
      reminderCache.set(key, reminder);
      catGetStaffAppointments.debug(() => `\n\n${prettyjson.render(reminder)}`);
    }
  );
  reminderCache.forEach(reminder => {
    if (reminder.Status !== Confirmed) {
      catGetStaffAppointments.debug(() => reminder.toWhatsAppURI());
    }
  });
}
